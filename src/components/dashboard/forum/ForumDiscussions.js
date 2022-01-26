import React from "react";

const ForumDiscussions = ({ discussions }) => {
  const limit = 3;

  var forumDiscussionListItemStyle = {
    padding: '15px 0 15px 15px',
  };
  
  var forumDiscussionListStyle = {
    paddingBottom: '15px',
    fontWeight: '500',
  };

  return (
    <ul className="forumDiscussionList" style={forumDiscussionListStyle}>
      {discussions.slice(0, limit).map((discussion) =>
        <li className="forumDiscussionListItem" style={forumDiscussionListItemStyle} key={discussion.discussionID}><a target="_blank" rel="noopener noreferrer" href={discussion.url}>{discussion.name}</a></li>
      )}
    </ul>
  );


};
export default ForumDiscussions;