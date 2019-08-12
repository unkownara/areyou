import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import Header from '../Components/Header';

const TNCWrapper = styled.div`
    padding: 20px;
    padding-bottom: 40px;
    text-align: left;
    margin: 30px 100px;

    @media(max-width: 700px){
        padding: 20px;
        margin: 15px 0 30px 0;
    }
`

const Title = styled.div`
    font-size: 28px;
    margin: 30px 0;
    color: #333;
    letter-spacing: 1px;
    font-weight: bold;
`

const Heading = styled.div`
    margin: 30px 0;
    color: #636363;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 1px;
    text-transform: uppercase;
`

const Content = styled.div`
    color: #636363;
    line-height: 1.7em;
`

export default function TermsAndConditions(props) {

    useEffect(() => {
        ReactGA.pageview(`/terms-and-conditions/`);
        let userInfo = JSON.parse(localStorage.getItem('__u_info__'));

        ReactGA.event({
            category: 'Terms And Conditions Visit',
            action: 'Terms And Conditions Visit',
            label: (userInfo !== undefined && userInfo !== null ? `User ${userInfo.userId} visited Terms And Conditions Page` : `Logged out user visited Terms And Conditions Page`)
        });
    }, [])

    return (
        <Fragment>
            <Header origin={'Terms And Conditions Page'} />
            <TNCWrapper>
                <Title>Terms And Conditions</Title>
                <Heading>PRIVACY POLICY</Heading>
                <Content>
                    These terms and conditions(Terms & Conditions) are an agreement between the Website Operator(Are You?, “us”, “we” or, “our”) and you, the visitor(“Visitor”, “Customer”, “User”, “you” or “your”).This Agreement sets forth the general Terms & Conditions of your use of the website[https://areyou.netlify.com.] and any of its services (collectively, “Website” or “Services”).<br></br>
                    This Website is created in the interest of the general public who shall have access to the contents of this Website.By accessing this Website and using its content, you acknowledge and you agree that you have read and understood the following terms of use and you agree to be bound by them.These Terms & Conditions may be revised at any time by updating this posting.You are bound by any such revisions and therefore we advise you to review these Terms & Conditions every time you use this Website.Do not access, download materials from this Website, if you do not agree with these terms of use.
            </Content>
                <Heading>ACCEPTANCE OF TERMS & CONDITIONS</Heading>
                <Content>
                    You acknowledge that you have read and agree with all these Terms & Conditions. By using the Website or its Services, you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Website and its Services. "Are You?" reserves the right to store information on a User’s computer in the form of “cookie” or similar file for purposes of modifying the Website to reflect the User’s preference.
            </Content>
                <Heading>REPRESENTATION BY USER</Heading>
                <Content>The Visitor to the Website represents that the Visitor is legally competent to enter into a binding legal contract and agrees to be bound by these Terms & Conditions.</Content>
                <Heading>TERMS AND CONDITIONS FOR USE</Heading>
                <Content>This Website is deemed to be in use when it is loaded in a temporary or permanent memory of your computer.</Content>
                <Heading>ACCOUNTS AND MEMBERSHIP</Heading>
                <Content>If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. The content provided bt you will be visible to all other users, any false content or bad content or discriminative content may result in blocking/deleting your account and we will not be responsible for the content provided by you. People providing the content in our website will be facing everything that comes as outcome based on the content. The content you provide in our websites is at your own risk. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of these Terms & Conditions or that your conduct or content would tend to damage our reputation and goodwill, or lead to a violation of the provisions of applicable law. We may block your email address and Internet protocol address to prevent further registration.</Content>
                <Heading>RESTRICTIONS ON USE</Heading>
                <Content>The Company owns and holds all the rights for the information, contents, audio, video, logos and trademarks contained in this Website. Any reproduction, modification, creation of derivate works, distribution, transmission, copying, selling, displaying, publishing or using any of the information, contents, audio, video, logos and trademarks contained in this Website for any purpose whatsoever, whether electronically or otherwise, without the prior written permission of the Company is strictly prohibited. Any violation of this provision would be strictly dealt with. You may download material displayed on this Website for your personal use only, provided that you also retain the clauses pertaining to all copyright and other proprietary notices contained in the materials.
                    User acknowledges and affirms that he/she shall not:<br></br>
                    Engage in fraudulent, abusive or illegal activity, including but not limited to any communication or solicitation designed or intended to fraudulently obtain the password or any private information of any use.<br></br>
                    Use the Website to violate the security of any computer network, crack passwords or security encryption codes, transfer or store illegal material including threatening or obscene material or engage in any kind of illegal activity.<br></br>
                    Although "Are You?" may, from time to time, monitor or review any facilities, if established or otherwise offered at the Website for discussions, chats, postings, transmissions, bulletin boards, and the like on the Website, "Are You?" is under no obligation to do so and assumes no responsibility or liability arising from the content of any such locations nor for any error, defamation, libel, slander, omission, falsehood, obscenity, pornography, profanity, danger, or inaccuracy contained in any information contained within such locations on the Website. You are prohibited from posting or transmitting any unlawful, threatening, libelous, defamatory, obscene, scandalous, inflammatory, pornographic, or profane material or any material that could constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability, or otherwise violate any law. "Are You?" will fully cooperate with any law enforcement authorities or court order requesting or directing "Are You?" to disclose the identity of anyone posting any such information or materials.</Content>
                <Heading>USE OF INFORMATION</Heading>
                <Content>The content is available for informational purposes only. The posting of contents and access to this website does not render, either explicitly or implicitly, any provision of services or products by us. All advertisements contain only an indication of benefits offered by the products.</Content>
                <Heading>LINKS TO OTHER WEBSITES</Heading>
                <Content>Although this Website may be linked to other websites, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked website, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their websites. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any website which you access through a link from this Website. Your linking to any other off-site websites is at your own risk.</Content>
                <Heading>RESERVATION OF RIGHTS</Heading>
                <Content>We reserve the right to change, modify, add to, or remove portions of these terms of use at any time, subject to Company’s policy as amended time to time without any intimation to You. Your continued usage of the website would mean that You agree with the revised terms and conditions. .</Content>
                <Heading>PRIVACY POLICY</Heading>
                <Content>In the process of using this Website, the Privacy Policy as set forth in the Website areyou.netlify.com shall be applicable.</Content>
            </TNCWrapper>
        </Fragment>
    );
}

