import { ClassAttributes, ImgHTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';

export default function ApplicationLogo(
    props: JSX.IntrinsicAttributes &
        ClassAttributes<HTMLImageElement> &
        ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            className="h-36"
            src="https://i.ibb.co.com/60XqWn04/Official-Logo.png"
            alt="Logo"
            {...props}
        />
    );
}
