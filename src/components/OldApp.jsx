import React from 'react'

const OldApp = () => {
    // Define states for each form field
    const [checkpoint, setCheckPoint] = useState({
        productId: '',
        checkpointId: '',
        location: '',
        details: '',
        lat: -1,
        lng: -1,
        accr: 0,
    });


    useEffect(() => {
        const options = { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }

        if (navigator.geolocation === "undefined") return;
        navigator.geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setCheckPoint((prevState) => ({ ...prevState, lat: crd.latitude, lng: crd.longitude, accr: crd.accuracy }));
        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }, options);

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCheckPoint((prevState) => ({ ...prevState, [name]: value }));
    };
  <div>
        {checkpoint.lat}
      </div>
      <div>
        {checkpoint.lng}
      </div>
      <div>
        {checkpoint.accr / 100}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            name="productId"
            value={checkpoint.productId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="checkpointId">Checkpoint ID:</label>
          <input
            type="text"
            name="checkpointId"
            value={checkpoint.checkpointId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            value={checkpoint.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            name="details"
            value={checkpoint.details}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
}

export default OldApp