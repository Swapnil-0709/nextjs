'use client'

import {useEffect, useState} from 'react';

export function SkeletonTime() {

    const [ghost, setGhost] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setGhost(false)
        }, 2000)
    }, []);
    return ghost
};

