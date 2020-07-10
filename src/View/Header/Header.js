import * as React from "react";
import {NavLink, Link} from "react-router-dom";
import '../../Styles/style.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {getSources} from "../../client";
import ContactUs from "../ContactUs/ContactUs";

class Header extends React.Component {
  state = {
    sources: [],
    searchText: ""
  }
  componentDidMount() {
    getSources().then((res)=>{
      const data = res.sources.slice(0, 5);
      this.setState({
        sources: data
      })
    })
  }

  showDropDown = () => {
    const dropdowns = document.getElementById("myDropdown");
    if (dropdowns.style.display) {
      dropdowns.style.display = ""
    } else {
      dropdowns.style.display = "block"
    }
  }

  closeDropDown = () => {
    const dropdowns = document.getElementById("myDropdown");
    dropdowns.style.display = "";
  }

  editSearchText = (event) => {
    event.preventDefault();
    this.setState({
      searchText: event.target.value
    });
  }

  openContactUsModal = () => {
    this.closeDropDown();
    const contactUsModal = document.getElementById("contactUsModal");
    contactUsModal.style.display = "block";
  }

  closeContactUsModal = () => {
    const contactUsModal = document.getElementById("contactUsModal");
    contactUsModal.style.display = "none";
  }

  render() {
    const navComponent = this.state.sources.map((source) => (
      <li key={`source-${source.id}`}>
        <NavLink activeClassName='active' className="header-item"
                 to={`/${source.id}`}
                 onClick={this.closeDropDown}
        >
          {source.name}
        </NavLink>
      </li>
    ));
    const navBar =
      <>
        <li>
          <NavLink
            to="/home"
            activeClassName='active'
            className="header-item"
            onClick={this.closeDropDown}
          >
            Home
          </NavLink>
        </li>
        {navComponent}
        <li>
          <div className="header-item">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" value={this.state.searchText} onChange={this.editSearchText}/>
                <div className="input-group-append" >
                  <button className="btn btn-info" disabled={!this.state.searchText} onClick={this.closeDropDown}>
                    {this.state.searchText ? <Link
                      className="search-button"
                      to={`/search?q=${this.state.searchText}`}
                      disabled={!this.state.searchText}
                    >
                      Search
                    </Link> : 'Search'
                    }
                  </button>
                </div>
            </div>
          </div>
        </li>
        <li>
          <div className="header-item">
            <button className="btn btn-info" onClick={this.openContactUsModal}>Contact Us</button>
          </div>
        </li>
      </>
    return (
      <div>
        <div id="contactUsModal" className="contactUsModal">
          <div className="modal-content">
            <span className="close-icon" onClick={this.closeContactUsModal}><i className="fa fa-close"></i> </span>
            <ContactUs onClose={this.closeContactUsModal}/>
          </div>

        </div>
        {this.state.sources && this.state.sources.length ?
          <div>
            <ul className="header">
              {navBar}
            </ul>
            <div className="dropdown">
              <button
                onClick={this.showDropDown}
                className="dropbtn"
              >
                <i className="fa fa-bars"></i>
              </button>
              <div id="myDropdown" className="dropdown-content">
                <ul className="drop-down-header">
                  {navBar}
                </ul>
              </div>
            </div>
          </div>
           :
          <div></div>}
      </div>
    )
  }
}

export default Header;