import { url } from "inspector";
import React, { useEffect } from "react";
import TashkaVid from '../assets/video/tashka.mp4';
import DuneVid from '../assets/video/dune_bible_video.mp4';


type Props ={
    duneFlag: boolean;
    tashkaFlag: boolean;
}


export default function VideoComponent({duneFlag, tashkaFlag}: Props) {

  //RE-ENABLE BEFORE LAUNCH

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  })


  function VidSizer(){
    if (tashkaFlag) {
      return (
        <video loop autoPlay height="55%" width="55%" controls controlsList="nodownload">
        <source src={TashkaVid} type="video/mp4" />
      </video>
      )}
    
      if (duneFlag) {
        return(
          <video loop autoPlay height="70%" width="70%" controls controlsList="nodownload">
          <source src={DuneVid} type="video/mp4" />
        </video>
        )}

  }

  function HeaderPicker() {
    if (tashkaFlag) {
      return (
        <div className='VideoTextContainer' style={{ marginTop: "0rem", marginBottom: "3rem" }}>
          <div className='HeaderText'>
            TASHKA
          </div>
          <div className="Credits">Written, Direct and Animated by Ben Clarkson</div>
          <div className="Credits">Based on "Frontier South" by Manxome</div>
          <div className="Credits" style={{ marginBottom: "0.5rem" }}>Produced by Spice DAO</div>
        </div>
      )
    }
    if (duneFlag) {
      return(
      <div className='VideoTextContainer' style={{marginTop: "0rem", marginBottom: "3rem", width: "80%" }}>
        <div className='HeaderText' style={{marginBottom: "0.6rem"}}>
          DUNE BIBLE
        </div>
        <div className="Credits" style={{fontSize: "18px"}}>Michel Seydoux presents Alejandro Jodorowsky’s Dune from Frank Herbert's novel</div>
        <div className="Credits"  style={{fontSize: "18px"}}>Design by Jean Giraud Machines by Chris Foss Special effects by Dan O’Bannon </div>
        <div className="Credits" style={{fontSize: "18px", marginBottom: "0.6rem"}}>Dialogue by M. Demuth and A. Jodorowsky</div>

        <div className="Credits" style={{fontSize: "18px", marginBottom: "0.6rem"}}>Edition 5 printed in 1975
        </div>
        
        <div className="Credits" style={{fontSize: "18px", marginBottom: "0.5rem" }}>Acquired at auction at Christie's Paris on Nov. 21, 2021 for €2,660,000 by Spice DAO</div>
      </div>
      )
    }
  }

  return (
    <div className="VideoComponent">
      {HeaderPicker()}
      {VidSizer()}
    </div>
  )
}
