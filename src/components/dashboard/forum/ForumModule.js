import React from 'react';
import { Box, Button } from 'react-bulma-components/full';
import ForumDiscussions from './ForumDiscussions';

export const ForumModule = ({tasks, tasksCompleteCount, tasksTotalCount, forumDiscussions,localhost}) => {
    localhost = true;
    if(localhost){
        forumDiscussions = [
            {
                "discussionID": 416,
                "type": null,
                "name": "2020 IEC Pools are now open!",
                "body": "<p>It&#039;s the moment you&#039;ve been waiting for: IEC 2020 season! After some technical difficulties at IRCC, most pools are finally open. To avoid any further hiccups for you, we have a great new tool to help you organize everything for your move. Welcome to Moving2Canada GO!</p><div class=\"js-embed embedResponsive\" data-embedJson=\"{&quot;body&quot;:&quot;Moving2Canada go is a personalized and interactive tool.&quot;,&quot;photoUrl&quot;:&quot;https:\\/\\/moving2canada.com\\/wp-content\\/uploads\\/2019\\/12\\/GO_branded-social-1.png&quot;,&quot;url&quot;:&quot;https:\\/\\/moving2canada.com\\/go\\/&quot;,&quot;embedType&quot;:&quot;link&quot;,&quot;name&quot;:&quot;Moving2Canada Go | Your move, made simple.&quot;}\">\n    <a href=\"https://moving2canada.com/go/\" rel=\"nofollow noreferrer ugc\">\n        https://moving2canada.com/go/\n    </a>\n</div><p><br></p>",
                "categoryID": 12,
                "dateInserted": "2019-12-11T22:15:03+00:00",
                "dateUpdated": null,
                "dateLastComment": "2020-02-11T13:05:05+00:00",
                "insertUserID": 8,
                "pinned": true,
                "pinLocation": "recent",
                "closed": false,
                "sink": false,
                "countComments": 39,
                "countViews": 679,
                "score": null,
                "url": "https://forum.moving2canada.com/discussion/416/2020-iec-pools-are-now-open",
                "canonicalUrl": "https://forum.moving2canada.com/discussion/416/2020-iec-pools-are-now-open",
                "bookmarked": false,
                "unread": false,
                "attributes": {},
                "groupID": null
            },
            {
                "discussionID": 20,
                "type": null,
                "name": "Please read: International Experience Canada (IEC)",
                "body": "<p>*Please read the below before posting to this forum*</p><p>Welcome to the Moving2Canada forum! We operate a friendly, welcoming community for members who share this ethos.</p><p>Before posting in this category, please consult these helpful resources:</p><ul><li><a href=\"https://moving2canada.com/working-holiday-visa-in-canada/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">How to apply for an IEC work permit</a></li><li><a href=\"https://moving2canada.com/iec-young-professionals-canada/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">The Young Professionals Category</a></li><li><a href=\"https://moving2canada.com/iec-international-co-op/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">The International Co-op Category</a></li><li><a href=\"https://moving2canada.com/iec-canada-visa/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">IEC: Frequently Asked Questions</a></li><li><a href=\"https://moving2canada.com/working-holiday-canada-news-hub/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">IEC &ndash; Latest News</a></li><li><a href=\"https://moving2canada.com/international-experience-canada-countries/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">Participating countries</a></li><li><a href=\"https://moving2canada.com/iec-recognized-organizations/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">Recognized Organizations for countries without an IEC agreement</a></li><li><a href=\"https://moving2canada.com/travel-insurance-for-canada/\" rel=\"nofollow noreferrer ugc\">Travel Insurance for IEC</a></li><li><a href=\"https://moving2canada.com/biometrics-for-iec/\" rel=\"nofollow noreferrer ugc\">IEC and Biometrics</a></li><li><a href=\"https://moving2canada.com/iec-implied-status/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">IEC and implied status</a></li><li><a href=\"https://moving2canada.com/iec-visa-couples-groups/?utm_source=Community&amp;utm_medium=Forum&amp;utm_campaign=IECSticky\" rel=\"nofollow noreferrer ugc\">IEC as a couple</a></li><li><a href=\"https://moving2canada.com/work-and-travel-in-canada-iec-extension/\" rel=\"nofollow noreferrer ugc\">Eligible reasons for IEC extensions</a></li></ul><p>Please consult the full <a href=\"https://forum.moving2canada.com/discussion/10/please-read-before-posting-forum-rules-guidelines\" rel=\"nofollow noreferrer ugc\">Rules &amp; Guidelines</a> of this community before posting.</p><p>Please note that the following is not permitted in this community:</p><ul><li>Abusive or hostile commentary.</li><li>Private messaging other members without invitation. Many members find this annoying, and questions should instead be posted on the forum itself.</li><li>Posts by third parties of a commercial nature. Please contact an admin if you think you have valuable services to promote in the forum.</li><li>Irrelevant and thin content. Don&#039;t spam, don&#039;t post stuff without an explanation as to why your content might be of value.</li></ul><p>Members engaging in any of the above can be removed from the forum without warning. Please use the Report button if you find any offensive posts.</p><p>If you are contacted privately by another member, please do not give out any sensitive information or money. If you are suspicious, please send details and a screenshot to the admins via private message and we&#039;ll investigate.</p><p>We&#039;re delighted to have you in our community! Don&#039;t forget to visit <a href=\"https://l.facebook.com/l.php?u=http%3A%2F%2Fwww.moving2canada.com%2F%3Ffbclid%3DIwAR3GRTACfxu7RlNLwmzTicPaPgCd2ZIvQ7KRpkQWquslm0kM7K7JcSWdv9E&amp;h=AT0f3_xjgfE4DIncWIYX7jYyce_ZXSrRMoBjPpFdE96FVBUt82ci91je13ir7q7Qbh6nIS6EgWGWGx8n_huv8wTOIBB05xHsJvjVcUlL5mGKDE_IW7uWmv1YRVP8y8LvXZJHodSjP4CJ1W15_i8\" rel=\"nofollow noreferrer ugc\">www.moving2canada.com</a> for even more advice.</p>",
                "categoryID": 12,
                "dateInserted": "2019-05-23T20:27:10+00:00",
                "dateUpdated": null,
                "dateLastComment": "2019-05-23T20:27:10+00:00",
                "insertUserID": 8,
                "pinned": true,
                "pinLocation": "category",
                "closed": false,
                "sink": false,
                "countComments": 0,
                "countViews": 324,
                "score": null,
                "url": "https://forum.moving2canada.com/discussion/20/please-read-international-experience-canada-iec",
                "canonicalUrl": "https://forum.moving2canada.com/discussion/20/please-read-international-experience-canada-iec",
                "bookmarked": false,
                "unread": false,
                "attributes": {},
                "groupID": null
            },
            {
                "discussionID": 590,
                "type": null,
                "name": "How can I work",
                "body": "<p>How can I apply for a working visa from Malaysia? I&#039;ve worked and gained experience in Melbourne, Australia.</p>",
                "categoryID": 12,
                "dateInserted": "2020-02-13T00:49:05+00:00",
                "dateUpdated": null,
                "dateLastComment": "2020-02-13T00:49:05+00:00",
                "insertUserID": 2065,
                "pinned": false,
                "pinLocation": null,
                "closed": false,
                "sink": false,
                "countComments": 0,
                "countViews": 3,
                "score": null,
                "url": "https://forum.moving2canada.com/discussion/590/how-can-i-work",
                "canonicalUrl": "https://forum.moving2canada.com/discussion/590/how-can-i-work",
                "bookmarked": false,
                "unread": false,
                "attributes": {},
                "groupID": null
            },
            {
                "discussionID": 577,
                "type": null,
                "name": "Do recognised organisations get priority over IEC visas?",
                "body": "<p>Hi Everyone, </p><p>Just wondering if anyone might be able to help, I have applied for a IEC visa from the UK pool and was wondering if the chances of getting a visa were higher if I applied using a recognised organisation?  I read somewhere that they can facilitate IEC invitations for their participants...</p><p>Desperate to participate in the IEC and I turn 30 in October so worried this may be my only chance to apply due to the age restrictions. </p><p>Thanks in advance</p>",
                "categoryID": 12,
                "dateInserted": "2020-02-11T10:13:59+00:00",
                "dateUpdated": null,
                "dateLastComment": "2020-02-12T23:12:32+00:00",
                "insertUserID": 2024,
                "pinned": false,
                "pinLocation": null,
                "closed": false,
                "sink": false,
                "countComments": 2,
                "countViews": 12,
                "score": null,
                "url": "https://forum.moving2canada.com/discussion/577/do-recognised-organisations-get-priority-over-iec-visas",
                "canonicalUrl": "https://forum.moving2canada.com/discussion/577/do-recognised-organisations-get-priority-over-iec-visas",
                "bookmarked": false,
                "unread": false,
                "attributes": {},
                "groupID": null
            },
            {
                "discussionID": 588,
                "type": null,
                "name": "POE Letter",
                "body": "<p>Hi,</p><p>Is a correspondence letter the same as a port of entry letter?<p><br></p></p><p>Thanks,</p><p>Katie</p>",
                "categoryID": 12,
                "dateInserted": "2020-02-12T20:34:28+00:00",
                "dateUpdated": null,
                "dateLastComment": "2020-02-12T22:20:10+00:00",
                "insertUserID": 1907,
                "pinned": false,
                "pinLocation": null,
                "closed": false,
                "sink": false,
                "countComments": 1,
                "countViews": 3,
                "score": null,
                "url": "https://forum.moving2canada.com/discussion/588/poe-letter",
                "canonicalUrl": "https://forum.moving2canada.com/discussion/588/poe-letter",
                "bookmarked": false,
                "unread": false,
                "attributes": {},
                "groupID": null
            }
        ];
    }
    const handleBtnClick = event => {
        window.open("https://forum.moving2canada.com/categories/international-experience-canada-(iec)", "_blank") //to open new page
    }

    

    return (
    <Box className="forumModule module">
        <h2 className="subtitle">IEC forum discussions</h2>
        <ForumDiscussions discussions={forumDiscussions}/>
        <Button 
            className="red arrow"
            onClick={() => { handleBtnClick() }}
        >
            Join the conversation
        </Button>
    </Box>
    )
    
}