import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="p-4 text-white">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search emails..."
                className="w-full p-2 rounded-lg bg-black border border-white/20"
            />
        </div>
    );
};

export default SearchBar;
