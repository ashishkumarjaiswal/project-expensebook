import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Section,
    Text
} from '@react-email/components'

interface Reset_password_Props {
    userFirstname?: string
    resetPasswordLink?: string
}

export const Reset_password = ({ userFirstname, resetPasswordLink }: Reset_password_Props) => {
    return (
        <Html>
            <Head />
            <Preview>ExpenseBook reset your password</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`https://i.ibb.co/MDCL5w3/expensebook-high-resolution-logo.png`}
                        width="400"
                        height="400"
                        alt="ExpenseBook Logo"
                    />
                    <Section>
                        <Text style={text}>Hi {userFirstname},</Text>
                        <Text style={text}>
                            Someone recently requested a password change for your ExpenseBook
                            account. If this was you, you can set a new password here:
                        </Text>
                        <Button style={button} href={resetPasswordLink}>
                            Reset password
                        </Button>
                        <Text style={text}>
                            If you don&apos;t want to change your password or didn&apos;t request
                            this, just ignore and delete this message.
                        </Text>

                        <Text style={text}>Thank You</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default Reset_password

const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0'
}

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px'
}

const text = {
    fontSize: '16px',
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px'
}

const button = {
    backgroundColor: '#007ee6',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '210px',
    padding: '14px 7px'
}

const anchor = {
    textDecoration: 'underline'
}
