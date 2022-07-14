import logo from '../../components/assets/images/logo2.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faDiscord, faMedium } from '@fortawesome/free-brands-svg-icons'
//import {}


export default function Home(){
    return(
        <div className='Home'>
        <img className='Home__logo' src={logo} alt="Spice DAO logo" />


        <div className='Home__links'>
            <a href="https://forum.spicedao.xyz/">Forum</a>
            <a href="https://snapshot.org/#/dunedao.eth">Governance</a>
            <a href="https://snapshot.org/#/dunedao.eth">Governance</a>
          </div>

          <div className='Home__links'>
            <a href="https://forum.spicedao.xyz/">Forum</a>
            <a href="https://snapshot.org/#/dunedao.eth">Governance</a>
            <a href="https://snapshot.org/#/dunedao.eth">Governance</a>
          </div>

        
          <div className="Home__text">
            <p> <b>Spice DAO </b> is a Web3 production studio publishing sci-fi animation and NFTs from established writers and artists.
            </p>
            <p>The DAO was founded by 800+ pop culture enthusiasts that crowdfunded $12M to win the auction of the Dune Bible at Christie’s Paris in November 2021 for $3M.
            </p>
            <p>We are currently producing an original animated limited series to be distributed by a streaming service and are opening an NFT studio that provides white glove service to high profile creators to develop strategy and concepts; design and build technology products; and advise on marketing campaigns to onboard the next million users to Web3.
            </p>
            <p>The DAO has been featured in The Guardian, The New Yorker, Financial Times, Business Insider, Wired Magazine and more mainstream news outlets. We have a combined following of 10K+ on social media.
            </p>
          </div>
          <div className="Home__social_icons">
            <a href="https://twitter.com/TheSpiceDao"> {<FontAwesomeIcon icon={faTwitter} />} </a>
            <a href="http://discord.gg/SPICEDAO">{<FontAwesomeIcon icon={faDiscord} />}</a>
            <a href="https://medium.com/@SpiceDao">{<FontAwesomeIcon icon={faMedium} />}</a>
            {/* <a href="mailto:team@spicedao.xyz">< FaEnvelope /></a> */}
          </div>
        </div>
    )
}