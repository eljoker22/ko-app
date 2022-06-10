import classes from '../styles/Match.module.css';
import { Input } from './Inputs';
import { Button } from './Buttons';

function ChatMatch() {
    return(
        <div className={classes.chat}>
            ChatMatch
            <form>
                <Input />
                <Button>
                    send
                </Button>
            </form>
        </div>
    )
}

export default ChatMatch;