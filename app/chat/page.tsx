'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, FileText, Moon, Sun, Image as ImageIcon, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import EmailList from '@/components/EmailList' // Adjust the import path as needed
import SearchBar from '@/components/ui/searchbar';
const fetch = require('node-fetch');
const axios = require('axios');
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Papa from 'papaparse';
import mailman from '../../assets/mailman.png';

const markdownCsvContent = `
\`\`\`csv
Name,Age,Occupation
Alice,30,Engineer
Bob,25,Designer
Charlie,35,Manager
\`\`\`
`;

interface Message {
    id: number;
    content: string | { type: 'pdf' | 'image' | 'markdown', url: string };
    sender: 'user' | 'ai';
    status?: 'sending' | 'error';
    requiresAction?: boolean;
}

interface Email {
    id: string;
    subject: string;
}

interface EnhancedChatInterfaceProps {
    initialMessages?: Message[];
    enableActionButtons?: boolean;
}

const handleEmailSelect = (id: string) => {
    console.log(`Email ${id} selected`);
    // Add logic to handle email selection, e.g., display email content in chat
};

const arrayToMarkdownTable = (array) => {
    if (array.length === 0) return '';

    // Add extra space around cell content for better separation
    const headers = array[0].map(header => `| ${header} `).join('') + '|';
    const separator = array[0].map(() => '| --- ').join('') + '|';
    const rows = array.slice(1).map(row => row.map(cell => `| ${cell} `).join('') + '|').join('\n');
    
    // Add additional lines for better visual separation
    const rowSeparator = array[1] ? `${array[0].map(() => '| --- ').join('')}|` : '';

    return `${headers}\n${separator}\n${rowSeparator}\n${rows}`;
};

const handleMarkdownCsvContent = (markdownContent) => {
    // Extract CSV content from the Markdown code block
    const csvMatch = markdownContent.match(/```csv\n([\s\S]*?)\n```/);
    if (!csvMatch) return null;

    const csvContent = csvMatch[1].trim();
    const parsedData = Papa.parse(csvContent, { header: false }).data;
    const markdownTable = arrayToMarkdownTable(parsedData);
    return markdownTable
}

const AIIcon = ({ isAnimated = false }: { isAnimated?: boolean }) => (
    <svg
        className={`h-6 w-6 ${isAnimated ? 'animate-spin text-primary' : 'text-primary'
            }`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
            d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M17 8L13.5 11.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <circle cx="9" cy="15" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="1" fill="currentColor" />
    </svg>
);

const PDFViewer = ({ url }: { url: string }) => (
    <div className="pdf-viewer mt-2">
        <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
            width="100%"
            height="400px"
            className="rounded-lg border border-primary/20"
        />
    </div>
);

const ImageViewer = ({ url }: { url: string }) => (
    <div className="image-viewer mt-2">
        <img src={url} alt="Shared image" className="max-w-full h-auto rounded-lg border border-primary/20" />
    </div>
);

const MarkdownViewer = ({ content }: { content: string }) => (
    <div className="markdown-viewer mt-2 p-4 border border-primary/20 rounded-lg bg-white shadow-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
        </ReactMarkdown>
    </div>
);


export default function EnhancedChatInterface({ initialMessages = [], enableActionButtons = true }: EnhancedChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme, setTheme } = useTheme();
    const [emails, setEmails] = useState<Email[]>([
        { id: '1', subject: 'Welcome to our service' },
        { id: '2', subject: 'Your account summary' },
        { id: '3', subject: 'Important update regarding your subscription' },
        // Add more sample emails as needed
    ]);
    const [filteredEmails, setFilteredEmails] = useState<Email[]>(emails);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to track sidebar visibility

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessage: Message = { id: Date.now(), content: input, sender: 'user' };
            setMessages(prev => [...prev, newMessage]);
            setInput('');
            setIsTyping(true);

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                let aiResponse: Message;

                // This is a placeholder for actual AI logic
                if (input.toLowerCase().includes('show pdf')) {
                    aiResponse = {
                        id: Date.now() + 1,
                        content: { type: 'pdf', url: 'https://example.com/sample.pdf' },
                        sender: 'ai',
                        requiresAction: enableActionButtons,
                        action: null
                    };
                } else if (input.toLowerCase().includes('show image')) {
                    aiResponse = {
                        id: Date.now() + 1,
                        content: { type: 'image', url: 'https://example.com/sample-image.jpg' },
                        sender: 'ai',
                        requiresAction: enableActionButtons,
                        action: null
                    };
                } else if (input.toLowerCase().includes('show table')) {
                    const table = handleMarkdownCsvContent(markdownCsvContent)
                    aiResponse = {
                        id: Date.now() + 1,
                        content: {
                            type: 'markdown',
                            url: table
                        },
                        sender: 'ai',
                        requiresAction: enableActionButtons,
                        action: null
                    };
                } else {
                    aiResponse = {
                        id: Date.now() + 1,
                        content: "I'm an AI assistant. How can I help you?",
                        sender: 'ai',
                        requiresAction: enableActionButtons,
                        action: null
                    };
                }

                let utterance = new SpeechSynthesisUtterance(String(aiResponse.content));
                speechSynthesis.speak(utterance);

                setMessages(prev => [...prev, aiResponse]);
            } catch (error) {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, content: "Sorry, there was an error processing your request.", sender: 'ai', status: 'error' }
                ]);
            } finally {
                setIsTyping(false);
            }
        }
    };


    const handleSearch = (query: string) => {
        if (query.trim()) {
            const filtered = emails.filter(email =>
                email.subject.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredEmails(filtered);
        } else {
            setFilteredEmails(emails); // Reset to all emails when search is cleared
        }
    };

    const handleAction = (messageId: number, action: 'accept' | 'decline') => {
        // Here you would typically send the action to your backend
        console.log(`Message ${messageId} ${action}ed`);
        // Update the message to reflect the action taken
        setMessages(prev => prev.map(msg =>
            msg.id === messageId ? { ...msg, action: action } : msg
        ));
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };
    

    return (
        <div className="flex w-full h-screen relative">
            {/* Sidebar with Search and Email List */}
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'} overflow-hidden bg-black text-white border-r border-white/20 flex flex-col`}
            >
                {isSidebarOpen && (
                    <>
                        {/* Heading and Toggle Icon */}
                        <div className="flex items-center p-4 border-b border-white/20">
                            <img src={mailman.src} alt="logo" className="w-8 h-8 mr-3"/>
                            <h1 className="text-2xl font-bold flex-grow">MailMate</h1>
                            <Button onClick={toggleSidebar} variant="ghost" size="icon" className="ml-2">
                                {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                            </Button>
                        </div>
    
                        {/* Search Bar */}
                        <SearchBar onSearch={handleSearch} />
                        <ScrollArea className="flex-1">
                            <EmailList emails={filteredEmails} onSelectEmail={handleEmailSelect} />
                        </ScrollArea>
                    </>
                )}
            </div>
    
            {/* Close Button */}
            {!isSidebarOpen && (
                <Button
                    onClick={toggleSidebar}
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 z-10 bg-black text-white border border-white/20 shadow-lg"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            )}
    
            {/* Main Chat Interface */}
            <div className="flex flex-col flex-1">
                <header className="bg-primary text-primary-foreground p-4 shadow-md">
                    <div className="flex justify-between items-center px-4">
                        <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
                        <Button onClick={toggleTheme} variant="ghost" size="icon">
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </div>
                </header>
    
                <main className="flex flex-col flex-1 overflow-hidden bg-background">
                    <div className="flex-grow flex flex-col h-full px-4">
                        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                            {messages.map((message) => (
                                <div key={message.id} className="mb-4">
                                    <div
                                        className={`flex items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                                    >
                                        {message.sender === 'ai' && (
                                            <div className="mr-2 mb-1">
                                                <AIIcon />
                                            </div>
                                        )}
                                        <div
                                            className={`p-3 rounded-lg max-w-[70%] shadow-md ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                                        >
                                            {typeof message.content === 'string' ? (
                                                message.content
                                            ) : message.content.type === 'pdf' ? (
                                                <div>
                                                    <FileText className="h-6 w-6 mb-2" />
                                                    <PDFViewer url={message.content.url} />
                                                </div>
                                            ) : message.content.type === 'image' ? (
                                                <div>
                                                    <ImageIcon className="h-6 w-6 mb-2" />
                                                    <ImageViewer url={message.content.url} />
                                                </div>
                                            ) : message.content.type === 'markdown' ? (
                                                <div>
                                                    <MarkdownViewer content={message.content.url} />
                                                </div>
                                            ) : null}
                                        </div>
                                        {message.sender === 'user' && (
                                            <div className="ml-2 mb-1">
                                                <User className="h-6 w-6 text-primary" />
                                            </div>
                                        )}
                                    </div>
                                    {message.sender === 'ai' && message.requiresAction && (
                                        <div className="flex justify-start mt-2 ml-8">
                                            <Button
                                                onClick={() => handleAction(message.id, 'accept')}
                                                className={`mr-2 ${message.action === 'accept'
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : 'bg-green-500 hover:bg-green-600'}`}
                                                disabled={message.action === 'decline'}
                                            >
                                                <Check className="mr-2 h-4 w-4" /> Accept
                                            </Button>
                                            <Button
                                                onClick={() => handleAction(message.id, 'decline')}
                                                className={`${message.action === 'decline'
                                                    ? 'bg-red-500 hover:bg-red-600'
                                                    : 'bg-red-500 hover:bg-red-600'}`}
                                                disabled={message.action === 'accept'}
                                            >
                                                <X className="mr-2 h-4 w-4" /> Decline
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start mb-4 items-end animate-fadeIn">
                                    <div className="mr-2 mb-1">
                                        <AIIcon isAnimated />
                                    </div>
                                    <div className="bg-secondary text-secondary-foreground p-3 rounded-lg shadow-md">
                                        AI is thinking...
                                    </div>
                                </div>
                            )}
                        </ScrollArea>
    
                        <div className="p-4 border-t border-primary/20">
                            <div className="flex items-center">
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    className="flex-grow mr-2 bg-background border-primary/20"
                                />
                                <Button onClick={handleSend} size="icon" disabled={isTyping || !input.trim()}>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}