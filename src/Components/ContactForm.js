import React from "react";
import emailjs from "@emailjs/browser";

export class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: false,
      contact: "",
      email: "",
      emailError: false,
      emailError2: false,
      message: "",
      messageError: false,
      formValid: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  isValidEmail(email) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  }

  // isValidcontact(contactno) {
  //   return /^[6-9]\d{9}$/.test(contactno);
  // }

  handleBlur(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });

    if (value.length <= 0 && name == "name") {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }

    if (value.length <= 0 && name == "email") {
      this.setState({ emailError: true });
      this.setState({ emailError2: false });
    } else {
      this.setState({ emailError: false });
      if (this.isValidEmail(value)) {
        this.setState({ emailError2: false });
      } else {
        this.setState({ emailError2: true });
      }
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
    if (e.target.value) {
      this.setState({ nameError: false });
    }
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
    if (e.target.value) {
      this.setState({ emailError: false });
    }
  }
  handleContactChange(e) {
    this.setState({ contact: e.target.value });
  }
  handleMessageChange(e) {
    this.setState({ message: e.target.value });
    if (e.target.value) {
      this.setState({ messageError: false });
    }
  }

  handleSubmit(e) {
    const {
      name,
      email,
      contact,
      message,
      nameError,
      emailError,
      emailError2,
      messageError,
    } = this.state;

    this.setState({ nameError: name ? false : true });
    this.setState({ messageError: message ? false : true });
    this.setState({ emailError: email ? false : true });
    if (email && !emailError) {
      this.setState({ emailError2: this.isValidEmail(email) ? false : true });
    }

    if (
      name &&
      email &&
      message &&
      !nameError &&
      !emailError &&
      !emailError2 &&
      !messageError
    ) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }

    e.preventDefault();
    emailjs
      .sendForm(
        "service_fb0lwsi",
        "template_7udzv5i",
        e.target,
        "CoZJGcJ_xf9LkqGaT"
      )
      .then(
        (result) => {
          console.log("hii");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  render() {
    const {
      name,
      email,
      message,
      nameError,
      emailError,
      emailError2,
      messageError,
      formValid,
    } = this.state;

    if (!formValid) {
      return (
        <>
          <div
            className="card form-body shadow-sm  d-flex align-items-center justify-content-center flex-direction-column  px-3  py-4 mx-auto text-white"
            style={{ margin: "0", backgroundColor: "#000", borderRadius: "0" }}
          >
            <div className="card-header border-0 text-center text-uppercase">
              <h3>Contact Form</h3>
            </div>
            <div className="card-body  w-sm-100 col-sm-12 col-md-6">
              <form
                action="/"
                onSubmit={(e) => this.handleSubmit(e)}
                encType="multipart/form-data"
                autoComplete="off"
              >
                <div className="form-group">
                  <label className="mb-0">
                    Your name<span className="text-danger">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                  {nameError ? (
                    <div className="alert alert-danger mt-2">
                      Name is a required field.
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-0">
                    Your email<span className="text-danger">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  {emailError ? (
                    <div className="alert alert-danger mt-2">
                      Email is a required field.
                    </div>
                  ) : (
                    ""
                  )}
                  {emailError2 ? (
                    <div className="alert alert-danger mt-2">
                      Email invalid.
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label className="mb-0">Your contact number (Optional)</label>
                  <input
                    name="contact"
                    className="form-control"
                    type="tel"
                    maxlength="10"
                    pattern="[0-9]+"
                    placeholder="Enter your Phone number"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={this.handleContactChange}
                    value={this.state.contact}
                  />
                </div>
                <div className="form-group">
                  <label className="mb-0">
                    Message<span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="message"
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    value={this.state.message}
                    onChange={this.handleMessageChange}
                  />
                  {messageError ? (
                    <div className="alert alert-danger mt-2">
                      Message is a required field.
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-center mb-0">
                  <input
                    type="submit"
                    className="btn btn-primary btn-lg w-100 text-uppercase"
                    value="Submit Now"
                  />
                </p>
              </form>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="thankyou_details">
          <div className="alert alert-success mt-3">
            Mail sent successfully.
          </div>
        </div>
      );
    }
  }
}
