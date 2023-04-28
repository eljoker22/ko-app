import classes from '../styles/Match.module.css';
import { Input } from './Inputs';
import { Button } from './Buttons';
import { db } from '../firebase/firebase';
import { getDocs, collection, query, onSnapshot, where, setDoc, doc, addDoc } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import dynamic from "next/dynamic";
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import {useSelector} from 'react-redux';
import Loader from './Loader';

const EmojiPicker = dynamic(() => import("./EmojiPicker"), {
    ssr: false,
});


function ChatMatch({match}) {
    const user = useSelector(state => state.user);
    const [comments, setComments] = useState(null);
    const [snapShot, setSnapShot] = useState(null);
    const [comment, setComment] = useState('');
    const [openPicker, setOpenPicker] = useState(false);
    const [loading, setLoading] = useState(true);
    const chatRef = useRef(null);
    const commentsRef = useRef(null);
        console.log(match.sys.id)
    useEffect(() => {
        const q = query(collection(db, "chats"), where('matchId', '==', match?.sys.id));
        const unsubscribe = onSnapshot(q, (querySnapShot) => {
            setSnapShot(querySnapShot)
            console.log(querySnapShot)
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
            setLoading(false);
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
            avatar: user?.avatar,
            comment: comment,
            username: user?.username,
            userId: user?.id,
            time: new Date()
        }
        if (comment !== '' && user) {
            if (comments) {
                const arrayComments = comments.comments;

                arrayComments.push(data);

                await setDoc(doc(db, 'chats', comments.docId), {
                    comments: arrayComments,
                    matchId: match.sys.id
                });
                //console.log(arrayComments);
            }else{
                await addDoc(collection(db, 'chats'), {
                    comments: [data],
                    matchId: match.sys.id
                })
            }
            
        }
    }

    console.log(comments);
    console.log(user); 

    return(
        <div className={classes.chat} ref={chatRef}>
            <div className={classes.head_chat}>
                <h2>تعليقات المباراة</h2>
            </div>
            <div className={classes.comments} ref={commentsRef}>
                {loading ? <div className={classes.cont_load}><Loader /></div> : ''}
                {comments?.comments.map((c) => (
                    <div key={c.time}>
                        <div className={classes.comment}>
                        <img src={c.avatar ? `/avatars/${c.avatar}` : '/user.png'} />
                        <div>
                            <strong>{c.username}</strong>
                            <p>{c.comment.replaceAll('undefined', '')}</p>
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