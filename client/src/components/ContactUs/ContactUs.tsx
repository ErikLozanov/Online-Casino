export default function ContactUs () {

    return (
        <div id="booktable" className="contact">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="titlepage">
          <h3>Contact us now</h3>
        </div>
      </div>
    </div>
    <div className="white_bg">
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div className="contact">
            <form>
              <div className="row">
                <div className="col-sm-12">
                  <input
                    className="contactus"
                    placeholder="Name"
                    type="text"
                    name="Name"
                  />
                </div>
                <div className="col-sm-12">
                  <input
                    className="contactus"
                    placeholder="Phone"
                    type="text"
                    name="Email"
                  />
                </div>
                <div className="col-sm-12">
                  <input
                    className="contactus"
                    placeholder="Email"
                    type="text"
                    name="Email"
                  />
                </div>
                <div className="col-sm-12">
                  <textarea
                    className="textarea"
                    placeholder="Message"
                    name="Message"
                  />
                </div>
                <div className="col-sm-12">
                  <button className="send">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div className="rable-box">
            <figure>
              <img src="assets/images/cac.png" alt="#" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
}