import classes from '../../styles/Profile.module.css';
import nookies from 'nookies';
import moment from 'moment';

export async function getServerSideProps(ctx) {
    const token = nookies.get(ctx);
    const res = await fetch(`${process.env.API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token.jwt}`
        }
    }) 
    const user = await res.json();
    
    if (!user.avatar) {
        return{
            redirect: {
                destination: '/profile/avatar',
                permanent: false
            }
        }
    }
    return{
        props: {user: user}
    }
}

function Profile({user}) {
    console.log(user)
    const dateFix = moment(user.createdAt).format('l').split('/');
    const dateSign = `${dateFix[1]}/${dateFix[0]}/${dateFix[2]}`;
    console.log(dateSign);
    return(
        <div className={classes.profile_page}>
            <div className={classes.profile}>
                <div>
                <h2>حسابى</h2>
                    <div className={classes.avatar}>
                        <img src={`avatars/${user.avatar}`} />
                        <strong>{user.username}</strong>
                    </div>
                </div>
                <div className={classes.info}>
                    <h2>معلومات الحساب</h2>
                    <div>
                        <strong>البريد الالكترونى :</strong>
                        <span>{user.email}</span>
                    </div>
                    <div>
                        <strong>الاسم :</strong>
                        <span>{user.username}</span>
                    </div>
                    <div>
                        <strong>تاريخ التسجيل :</strong>
                        <span>{dateSign}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;