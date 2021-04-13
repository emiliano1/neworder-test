import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { useEffect, useState } from "react";
import Issue from '../../models/issue';
import { searchIssues } from '../../services/github';
import SearchIssueSuggestions from './searchIssueSuggestions';
import SearchBar from './searchBar';
import FoundIssues from './foundIssues';

const Search: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setisOpen] = useState(true);
  const [selectedIndex, setselectedIndex] = useState(-1);
  
  useEffect(() => {
    if (searchTerm.length > 2) {
      const timeOutId = setTimeout(() => {      
        searchIssues(searchTerm)
        .then(response => {
          setIssues(response);
        })
        .catch(error => {
          console.log(error);
        });
      }, 500);
      return () => clearTimeout(timeOutId);
    }    
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleFocus = () => {    
      setIsFocused(true)
  }

  const handleSuggestionSelected = (item) => {
    setSearchTerm(item.title);
    setIsFocused(false);
    setselectedIndex(-1);
  }

  const handleIssueSelected = (index) => {
    setselectedIndex(index);
    setisOpen(!isOpen);
  }

  const handleKeyboard = (key) => {
    switch (key) {
      case 'up':
        if (selectedIndex > 0) {
          setselectedIndex(selectedIndex -1);
        }
        break;
      case 'down':
        if (selectedIndex < issues.length) {
          setselectedIndex(selectedIndex + 1);
        }
        break;
      case 'enter':
        if (isFocused){
          setSearchTerm(issues[selectedIndex].title);
          setIsFocused(false);
          setselectedIndex(-1);
        }
        setisOpen(!isOpen);
        break;
      default:
        return;
    }
  }

  let suggestions = <></>;
  if (isFocused) {
    suggestions = <SearchIssueSuggestions 
                    issues={issues}
                    handleSuggestionClicked={handleSuggestionSelected}
                    handleSuggestionSelected={handleSuggestionSelected}
                    selectedIndex={selectedIndex}/>
  }

  return (
    <div>
      <KeyboardEventHandler
        handleKeys={['up', 'down', 'enter']}
        onKeyEvent = {(key,e) => handleKeyboard(key)}
      >
        <header className="App-header">
          <SearchBar
            onChange={handleSearch}
            onFocus={handleFocus}
            value={searchTerm}/>
          {issues && suggestions}
          {issues && !isFocused  && 
          <FoundIssues 
            issues={issues}
            selectedIndex={selectedIndex}
            handleIssueSelected={handleIssueSelected}
            isOpen={isOpen}/>
          }
        </header>
      </KeyboardEventHandler>
    </div>
  );
}

export default Search;
