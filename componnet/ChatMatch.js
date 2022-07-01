import classes from '../styles/Match.module.css';
import { Input } from './Inputs';
import { Button } from './Buttons';
import { db } from '../firebase/firebase';
import { getDocs, collection, query, onSnapshot, where, setDoc, doc, addDoc } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import dynamic from "next/dynamic";
import { HiOutlineEmojiHappy } from 'react-icons/hi';

const EmojiPicker = dynamic(() => import("./EmojiPicker"), {
    ssr: false,
});

function ChatMatch({match}) {
    const [comments, setComments] = useState(null);
    const [snapShot, setSnapShot] = useState(null);
    const [comment, setComment] = useState('');
    const [openPicker, setOpenPicker] = useState(false);
    const chatRef = useRef(null);
    const commentsRef = useRef(null);

    useEffect(() => {
        const q = query(collection(db, "chats"), where('matchId', '==', match?.id));
        const unsubscribe = onSnapshot(q, (querySnapShot) => {
            setSnapShot(querySnapShot)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (snapShot) {
            snapShot.forEach((doc) => {
                setComments({...doc.data(), docId: doc.id})
            })
            
        }
    }, [snapShot])

    useEffect(() => {
        chatRef.current.scroll({
            top: commentsRef.current.offsetHeight,
            left: 0, 
            behavior: 'smooth',
        });
    }, [chatRef, comments]);

    /// add comment to firestore
    const addComment = async (e) => {
        
        e.preventDefault();
        setComment('');
        const data = {
            avatar: 'Delivery boy-5.png',
            comment: comment,
            username: 'jemy80',
            userId: 37,
            time: new Date()
        }
        if (comment !== '') {
            if (comments) {
                const arrayComments = comments.comments;

                arrayComments.push(data);

                await setDoc(doc(db, 'chats', comments.docId), {
                    comments: arrayComments,
                    matchId: match.id
                });
                //console.log(arrayComments);
            }else{
                await addDoc(collection(db, 'chats'), {
                    comments: [data],
                    matchId: match.id
                })
            }
            
        }
    }

    console.log(comments);
    console.log(comment);  
    return(
        <div className={classes.chat} ref={chatRef}>
            <div className={classes.head_chat}>
                <h2>تعليقات المباراة</h2>
            </div>
            <div className={classes.comments} ref={commentsRef}>
                {comments?.comments.map((c) => (
                    <div key={c.time}>
                        <div className={classes.comment}>
                        <img src="/user.png" />
                        <div>
                            {c.comment.replaceAll('undefined', '')}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={addComment} className={classes.form_chat}>
                    <EmojiPicker visibile={openPicker} setComment={setComment} comment={comment} />
                    <div>
                        <div className={`${classes.buttons} ${openPicker ? classes.active : ''}`}>
                            <HiOutlineEmojiHappy onClick={() => setOpenPicker(!openPicker)} />
                        </div>
                        <Input onChange={(e) => setComment(e.target.value)} value={comment} placeholder="اترك تعليق..." />
                    </div>
            </form>
        </div>
    )
}

export default ChatMatch;