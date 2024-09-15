import React from 'react';

interface Email {
    id: string;
    subject: string;
    content: string;
}

interface EmailListProps {
    emails: Email[];
    onSelectEmail: (id: string) => void;
    selectedEmailId?: string;
}

const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail, selectedEmailId }) => {
    return (
        <ul className="space-y-2">
            {emails.map((email) => (
                <li
                    key={email.id}
                    className={`p-2 cursor-pointer hover:bg-gray-700 ${selectedEmailId === email.id ? 'bg-gray-600' : ''}`}
                    onClick={() => onSelectEmail(email.id)}
                >
                    {email.subject}
                </li>
            ))}
        </ul>
    );
};

export default EmailList;