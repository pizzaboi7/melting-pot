import React, {Component} from 'react';
import store from '../store';

import { setContentComponent, addSection, setSections } from "../actions/newsActions";
import { Components, clearContentView, setInitData } from '../utils/Components';

import api from '../utils/API';
import { Link, withRouter } from 'react-router-dom';


class SideBarItems extends Component {

  isChecked = (title) => {
    let urlTitle = this.props.history.location.pathname.replace("/", "").replace("-", " ");
    return title.toLowerCase() === urlTitle ? true : false;
  }
  createItemKey = (isCategory, item) => {
    if(isCategory){
      return (`${item.toLowerCase()}`)
    } else {
      return (`item-${item.toLowerCase().replace(' ', '-')}`)
    }
  }

  setCurrentComponent(urlParams){
    const component = urlParams.component;
    switch (component) {
      case Components.HOME:
        clearContentView()
        this.loadSections()
        break;
        
      case Components.SETTINGS:
        break;

      default:
        clearContentView()
        api.getCategory(urlParams, (res) => {
          setInitData(res);
          store.dispatch(setSections([res]))
        })
      }
      store.dispatch( setContentComponent(component))
  }

  loadSections(){

    api.getHot((res) => {
      setInitData(res);
      store.dispatch( setSections ( [res] ))
    })
    api.getLatest((res) => {
      store.dispatch( addSection( res ))
    })
  }

  render() {
    return this.props.items.map((item) => (
      <Link to={"/" + item.title.toLowerCase().replace(" ", "-")}>
      <li
        className='sidebar_item'
        key={this.createItemKey(false, item.title)}
        id={this.createItemKey(true, item.title)}
        onClick={(event) =>
          this.setCurrentComponent(
            {
              component: item.component,
              page: 1
            }
          )}
      >
        <input
          type='radio'
          name='sidebar-items'
          checked={this.isChecked(item.title)}
        />
        <label
          className='sidebar_item_label'
          htmlFor={this.createItemKey(false, item.title)}
        >
          <img src={item.icon} alt={item.title}/>
          <p className='sidebar_item_title' unread-amount={item.unreadAmount}>{item.title}</p>
        </label>
      </li>
      </Link>
    ));
  }

}

export default withRouter(SideBarItems);