import React, { useState, useRef, useEffect } from 'react';
import Picker from 'emoji-picker-react';


const EmojiPicker = ({visibile, comment, setComment}) => {

    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      setComment(comment + emojiObject.emoji)
    };
  
    return (
      <div className={`emoji-picker-container ${visibile ? 'active' : ''}`}>
        <Picker 
          onEmojiClick={onEmojiClick} 
          disableSearchBar={true}
          disableSkinTonePicker={true}
          native={true}
          preload={true}
          />
      </div>
    );

};

export default EmojiPicker;