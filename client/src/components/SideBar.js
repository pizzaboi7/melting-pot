import React, {Component} from 'react';
import SideBarSections from './SideBarSections.js';
import ProfileOverview from './ProfileOverview.js';
import store from '../store.js';
import '../stylesheets/DarkMode.css';
import { SidebarData } from '../data/SidebarData.js';

class SideBar extends Component {
  // handleDarkMode = () => {
  //   if(document.getElementById('sidebar') !== null) {
  //     if(store.getState().user.settings.darkMode) {
  //       document.getElementById('sidebar').classList.add('darkMode-sidebar');
  //     }
  //     else {
  //       document.getElementById('sidebar').classList.remove('darkMode-sidebar');
  //     }
  //   }
  // }

  componentDidMount = () => {
    // this.handleDarkMode();
  }

  render() {
    // this.handleDarkMode();

    return(
      <div className="sidebar">
        <ul className='sidebar_sections'>
          <SideBarSections sections={SidebarData}/>
        </ul>
        <ProfileOverview/>
      </div>
    );
  }

}

export default SideBar;