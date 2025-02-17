<?php

namespace App\Http\Controllers\API;

use Spatie\SimpleExcel\SimpleExcelReader;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserCommunity;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

// API

class UserController extends Controller
{
    public function login(Request $request)
    {
        $orgId = $request->get('organization')->id;
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::send(false, 'Validation error', $validator->errors());
        }

        $user =  User::with([
            'userDetail',  // Eager load the userDetail relationship
            'userCommunity' // Eager load the userCommunity relationship
        ])->where('username', $request->username)->where('organization_id', $orgId)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ApiResponse::send(false, 'Unauthorized');
        }

        $token = $user->createToken('MobileApp')->plainTextToken;

        return ApiResponse::send(true, 'Login successful', [
            'token' => $token,
            'user' => $user
        ]);
    }

    public function index(Request $request)
    {
        $orgId = $request->get('organization')->id;
        $user = new User();
        $members = $user->selectAllUsers($orgId);

        return ApiResponse::send(true, 'Member list retrieved', $members);
    }

    public function show(Request $request, $id)
    {
        $member = User::with(['userDetail' => function ($query) {
            $query->select('*'); // Adjust as needed
        }])->find($id);

        if (!$member) {
            return ApiResponse::send(false, 'Member not found');
        }

        return ApiResponse::send(true, 'Member details retrieved', $member);
    }



    public function importCSVMember(Request $request)
    {
        $orgId = $request->get('organization')->id;
        $pathToCsv = storage_path('app/public/fast_member.csv');
        $rows = SimpleExcelReader::create($pathToCsv)->getRows();


        $successCount = 0;

        $rows->each(function (array $row) use (&$successCount, $orgId) {
            $totalMatchesInText = $row['Sudah berapa match kira kira yang kamu ikutin bersama FAST 50:50'] ?? null;
            $totalMatch = 0;
            if ($totalMatchesInText === '< 3') {
                $totalMatch = 2;
            }
            if ($totalMatchesInText === '3 - 10') {
                $totalMatch = 7;
            }
            if ($totalMatchesInText === '> 10') {
                $totalMatch = 16;
            }

            $normalizedRow = [
                'fullname' => $row['Nama Lengkap (akan ditampilkan pada Form pendaftaran match mingguan)'] ?? null,
                'nickname' => $row['Nama Panggilan (biar akrab)'] ?? null,
                'birth_year' => $row['Tahun Lahir (jadi bahan pertimbangan pembagian tim)'] ?? null,
                'wa' => $row['Nomor Whatsapp'] ?? null,
                'ig' => $row['Minta IG nya dong (mau dicek, udah follow fast5050bandung belom, awas aja kalo belom)'] ?? null,
                'telu_relation' => $row['Hubungan dengan Telkom University (Boleh lebih dari 1)'] ?? null,
                'proof_of_relation' => $row['Upload bukti Hubungan dengan Telkom University (Karpeg, KTM, Ijazah, dll)'] ?? null,
                'joined_since' => $row['Kira-kira Sejak Tahun Berapa Ikut Main Futsal/Minsoc/Bola bareng FAST 50:50 (FAST Futsal berdiri sejak 2012)?'] ?? null,
                'total_matches' => $totalMatch,
                'preferred_positions' => $row['Preferensi Posisi Bermain (Pilih Minimal 2 untuk memudahkan pembagian tim, Kecuali Kiper boleh memilih 1 saja)'] ?? null,
                'favorite_position' => $row['Posisi Paling Favorit (Pada pengaturan formasi, akan diusahakan diletakkan di posisi favorit jika memungkinkan)'] ?? null,
                'least_favorite_position' => $row['Posisi Paling Ga Disukai. Saya lebih baik Tidak Jadi Ikut Main kalau ditarok di posisi?. Boleh Kosong (artinya bersedia ditarok di manapun jika memang terpaksa, yang penting main).'] ?? null,
                'game_types' => $row['Jenis Game apa aja yang kamu mau join?'] ?? null,
                'favorite_team' => $row['Tim Bola Favorit (Lokal dan/atau Internasional) (Untuk event khusus yang mungkin dibuat nanti)'] ?? null,
                'experience_level' => $row['Pengalaman'] ?? null,
                'owned_jerseys' => $row['Jersey FAST 50:50 yang sudah kamu miliki'] ?? null,
                'photo' => $row['Photo'] ?? null,
                'skills' => $row['Skill'] ?? null,
                'benefit' => $row['Benefit'] ?? null,
                'suggestion' => $row['Kritik'] ?? null,
            ];

            $normalizedRow['telu_relation'] = $this->convertTextToJsonArray($normalizedRow['telu_relation']);
            $normalizedRow['preferred_positions'] = $this->convertTextToJsonArray($normalizedRow['preferred_positions']);
            $normalizedRow['least_favorite_position'] = $this->convertTextToJsonArray($normalizedRow['least_favorite_position']);
            $normalizedRow['game_types'] = $this->convertTextToJsonArray($normalizedRow['game_types']);
            $ownedJerseys = $this->convertTextToJsonArray($normalizedRow['owned_jerseys']);
            $normalizedRow['skills'] = $this->convertTextToJsonArray($normalizedRow['skills']);

            $username = strtolower(str_replace(' ', '', $normalizedRow['nickname']));
            $user = User::updateOrCreate(
                ['username' => $username], // Using generated email as a unique identifier
                [
                    'username' => $username,
                    'organization_id' => $orgId,
                    'name' => $normalizedRow['fullname'],
                    'password' => Hash::make($username), // Change this logic as needed
                    'phone' => $normalizedRow['wa'], // Change this logic as needed
                ]
            );

            $userDetailRow = [
                'user_id' => $user->id,
                'fullname' => $normalizedRow['fullname'],
                'nickname'  => $normalizedRow['nickname'],
                'birth_year' => $normalizedRow['birth_year'],
                'wa' => $normalizedRow['wa'],
                'ig'    => $normalizedRow['ig'],
                'telu_relation' => $normalizedRow['telu_relation'],
                'skills' => $normalizedRow['skills'],
            ];
            $userDetail = UserDetail::updateOrCreate(
                ['user_id' => $user->id],
                $userDetailRow
            );

            // TODO: community id should be dynamic
            $userCommunityRow = [
                'user_id' => $user->id,
                'community_id' => 1,
                'joined_since' => $normalizedRow['joined_since'],
                'total_matches' => $normalizedRow['total_matches'],
                'preferred_positions' => $normalizedRow['preferred_positions'],
                'favorite_position' => $normalizedRow['favorite_position'],
                'least_favorite_position' => $normalizedRow['least_favorite_position'],
                'game_types' => $normalizedRow['game_types'],
                'favorite_team' => $normalizedRow['favorite_team'],
                'experience_level' => $normalizedRow['experience_level'],
                'owned_jerseys' => $ownedJerseys,
            ];
            $userCommunity = UserCommunity::updateOrCreate(
                ['user_id' => $user->id],
                $userCommunityRow
            );

            if ($userCommunity && $userDetail) {
                $successCount++;
            }
        });
        return ApiResponse::send(true, 'Memberd Created', ['created_member' => $successCount]);
    }


    private function convertTextToJsonArray($text)
    {
        return $text != '' ? json_encode(array_map('trim', explode(',', strtolower(str_replace(" (Sudah pesan tapi belom jadi)", "", $text))))) : null;
    }
}
