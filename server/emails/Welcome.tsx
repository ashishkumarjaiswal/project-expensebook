import { Body, Container, Head, Hr, Html, Img, Preview, Text } from '@react-email/components'

interface WelcomeProps {
    userFirstname: string
}

export const Welcome = ({ userFirstname }: WelcomeProps) => (
    <Html>
        <Head />
        <Preview>The sales intelligence platform that helps you uncover qualified leads.</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`https://i.ibb.co/MDCL5w3/expensebook-high-resolution-logo.png`}
                    width="400"
                    height="400"
                    alt="Expensebook logo"
                    style={logo}
                />
                <Text style={paragraph}>Hi {userFirstname},</Text>
                <Text style={paragraph}>
                    Welcome to Expense book, manage your expenses with ease. We are excited to have
                    you on board. We are here to help you get started. If you have any questions,
                    please feel free to reach us.
                </Text>
                {/* <Button pX={12} pY={12} style={button} href="https://expensebook.tech">
          Get started
        </Button> */}
                <Text style={paragraph}>
                    Best,
                    <br />
                    The Expensebook team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>408 Warren Rd - San Mateo, CA 94402</Text>
            </Container>
        </Body>
    </Html>
)

export default Welcome

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
    margin: '0 auto',
    padding: '20px 0 48px'
}

const logo = {
    margin: '0 auto'
}

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px'
}

const btnContainer = {
    textAlign: 'center' as const
}

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0'
}

const footer = {
    color: '#8898aa',
    fontSize: '12px'
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
