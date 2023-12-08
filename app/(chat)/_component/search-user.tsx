import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area"
import ChatUserList from "@/app/(chat)/_component/chat-user-list";

const SearchUser = () => {
    return (
        <React.Fragment>
            <Card className="mx-2 mt-3 h-[89vh]">
                <CardHeader className="border-b">
                    <div
                        className={cn("group  w-full relative text-sm")}>
                        <Search
                            className="shrink-0 h-[18px] w-[18px]  text-muted-foreground absolute top-[50%]  translate-y-[-50%] ms-3"/>
                        <Input placeholder="Search by username...."
                               className="text-muted-foreground px-10 font-medium ring-transparent bg-primary/5 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0"/>

                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[77vh] pe-3">
                        <ChatUserList/>
                    </ScrollArea>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default SearchUser;