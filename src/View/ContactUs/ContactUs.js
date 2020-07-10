import * as React from "react";

class ContactUs extends React.Component {
  state = {
    fields: {
      name: '',
      email: '',
      message: ''
    },
    fieldErrors: {},
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      fields: {
        name: '',
        email: '',
        message: ''
      },
    });
    this.props.onClose(true);
  };

  onInputChange = (evt) => {
    const fields = this.state.fields;
    const field = evt.target.name;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields }, ()=>  {
      this.validate(field);
    });
  };

  validate = (field) => {
    const errors = {...this.state.fieldErrors};
    if (!this.state.fields[field]) {
      errors[field] = `${field} required`
      this.setState({
        fieldErrors: errors
      })
    } else if (field === 'email'  && !this.validateEmail(this.state.fields[field])) {
      errors[field] = `Invalid ${field}`;
      this.setState({
        fieldErrors: errors
      })
    } else {
      errors[field] = ""
      this.setState({
        fieldErrors: errors
      })
    }
  }

  validation = () => {
    const field = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!field.name) return true;
    if (!field.email) return true;
    if (!field.message) return true;
    if (errMessages.length) return true;

    return false;
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Contact Us</h2>
        <form className="form-horizontal" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Name:</label>
            <div className="col-sm-12">
              <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={this.state.fields.name} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-12">
              <input type="text"
                     className="form-control"
                     id="email"
                     placeholder="Enter email"
                     name="email"
                     value={this.state.fields.email}
                     onChange={this.onInputChange}
              />
              <p className="text-danger">{ this.state.fieldErrors.email}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="pwd">Message:</label>
            <div className="col-sm-12">
              <textarea className="form-control" id="message" placeholder="Enter message" name="message" value={this.state.fields.message} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.message}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-info" disabled={this.validation()}>Submit</button>
            </div>
          </div>
        </form>
      </div>

    )
  }
}

export default ContactUs;