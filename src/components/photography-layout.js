import React, {useState, useEffect} from "react";

import ReactSidebar from "react-sidebar";
import Sidebar from './sidebar';
import SidebarLinks from './sidebar-links';
import ContentRenderer from './content-renderer';
import ContentHeader from '../components/content-header';

/**
 * UI composition component for photography section
 */
const mql = window.matchMedia(`(min-width: 992px)`); // Large devices using Bootstrap responsive breakpoint
const tolerancePixel = 40; // for auto-playing videos when scrolling

export default function PhotographyLayout(props) {
  
  const [isSidebarDocked, setIsSidebarDocked] = useState(mql.matches); // if on desktop, auto open sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [reactSidebarContent, setReactSidebarContent] = useState(null);

  // Scroll listener on content to autoplay and pause videos
  // Media query listener to auto expand/collapse sidebar
  useEffect(() =>  {
    let sidebarContent = document.getElementById('react-sidebar-content');
    setReactSidebarContent(sidebarContent);
    setVideoList(document.querySelectorAll('video'));
    document.getElementById('react-sidebar-content').addEventListener('scroll', setupAutoVideoPlay);
    mql.addListener(mediaQueryChanged);
    return(() => {
      mql.addListener(mediaQueryChanged);
      sidebarContent.removeEventListener('scroll', setupAutoVideoPlay);
    });
  }, [props])

  // Listener function to play/pause videos if they are in view
  function setupAutoVideoPlay() {
    // Get current browser top and bottom
    const scrollTop = reactSidebarContent.offsetHeight + tolerancePixel;
    const scrollBottom = reactSidebarContent.offsetHeight + window.outerHeight - tolerancePixel;
    // play video if it is in view, else, pause it
    videoList.forEach((video, index) => {
      let yTopVideo = video.getBoundingClientRect().top + reactSidebarContent.offsetHeight;
      let yBottomVideo = video.videoHeight + yTopVideo;
      if (scrollTop < yBottomVideo && scrollBottom > yTopVideo) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
  
  // Callback for react-side setopen event
  function onSetSidebarOpen(open) {
    setIsSidebarOpen(open);
  }

  // Callback for media query change
  function mediaQueryChanged() {
    setIsSidebarDocked(mql.matches);
    setIsSidebarOpen(false);
  }

  return (
    <div>
      <ReactSidebar sidebar={<Sidebar pageList={props.pageList} />}
                    open={isSidebarOpen}
                    docked={isSidebarDocked}
                    onSetOpen={onSetSidebarOpen}
                    contentId="react-sidebar-content"
                    styles={{ 
                      sidebar: { 
                        width: '250px',
                        'backgroundColor': '#eeeeee' 
                      } 
                    }}>
          <ContentHeader />
          <div className="container">
            <ContentRenderer pageList={props.pageList}
                            dataMap={props.dataMap} />
          </div>
      </ReactSidebar>
    </div>
  );
}

