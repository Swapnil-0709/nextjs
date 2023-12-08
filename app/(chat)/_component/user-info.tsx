import React from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar";

const UserInfo = () => {
    return (
        <React.Fragment>
            <div role="button"
                 className="flex items-center w-full text-sm p-3 bg-background hover:bg-primary/5">
                <div className="gap-x-2 flex items-center max-w-[150px]">
                    <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/shadcn.png"/>
                    </Avatar>
                    <span className="text-start font-medium line-clamp-1">
                                Jon&apos;s Chat
                            </span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserInfo;