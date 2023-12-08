'use client'

import React from 'react';
import EmojiPicker, {Theme} from "emoji-picker-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";


interface IconPickerProps {
    onChange: (icon: string) => void
    children: React.ReactNode
    asChild?: boolean
}

const IconPicker = ({onChange, children, asChild}: IconPickerProps) => {

    const currentTheme = ('light') as keyof typeof themeMap

    const themeMap = {
        'dark': Theme.DARK,
        'light': Theme.LIGHT
    }

    const theme = themeMap[currentTheme]
    return (
        <React.Fragment>
            <Popover>
                <PopoverTrigger asChild={asChild}>
                    {children}
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full border-none shoadow-none z-[99999]">
                    <EmojiPicker
                        height={350}
                        theme={theme}
                        onEmojiClick={(data) => onChange(data.emoji)}/>
                </PopoverContent>
            </Popover>
        </React.Fragment>
    );
};

export default IconPicker;