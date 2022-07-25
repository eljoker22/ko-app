import Link from 'next/link';
import { Button } from '../componnet/Buttons';

function notFoundPage() {
    const stylePage = {
        textAlign: 'center',
        marginTop: '50px'
    };
    return(
        <div style={stylePage}>
            <h1>404</h1>
            <h2>هذه الصفحة غير موجودة</h2>
            <Link href="/">
                <a>
                    <Button>
                        الذهاب للصفحة الرئيسية
                    </Button>
                </a>
            </Link>
        </div>
    )
}

export default notFoundPage;