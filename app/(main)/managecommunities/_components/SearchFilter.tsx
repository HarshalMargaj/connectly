import { Input } from "@/components/ui/input";
import React from "react";

interface SearchFilterProps {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter = ({ setSearchQuery }: SearchFilterProps) => {
	return (
		<div>
			<Input
				type="text"
				placeholder="Search communities..."
				onChange={e => setSearchQuery(e.target.value)}
			/>
		</div>
	);
};

export default SearchFilter;
