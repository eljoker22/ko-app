import Image from "next/image";
import classes from '../styles/Home.module.css';

export const CostumImage = (src, style) => {
    const Loader = () => {
        return '/login-background.jpg'
    }
    return(
        <div className={classes.Image}>
            <Image 
                src={src}
                layout='fill'
                objectFit='cover'
                placeholder="blur"
                blurDataURL={src}
                style={{ borderRadius: '15px', ...style}} // optional
                alt={'banner'}
            />
        </div>
    )
}

