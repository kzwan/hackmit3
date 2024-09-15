import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Email {
    id: string;
    subject: string;
}

interface EmailListProps {
    emails: Email[];
    onSelectEmail: (id: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail }) => {
    return (
        <div className="w-80 flex-shrink-0 bg-black text-white border-r border-white/20 flex flex-col h-full">
            <ScrollArea className="flex-1">
                {emails.map((email) => (
                    <div
                        key={email.id}
                        className="p-4 border-b border-white/20 cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => onSelectEmail(email.id)}
                    >
                        <p className="truncate">{email.subject}</p>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
};

export default EmailList;