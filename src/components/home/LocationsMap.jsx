const locations = [
  {
    name: "KNUST Branch",
    address: "Boadi Abaase Junction, Kumasi, Ghana",
    googleMapsUrl: "https://maps.app.goo.gl/XkDr1586gYEGNz129",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d949.01757346258!2d-1.542236882501166!3d6.671049715798683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb9500210e99f3%3A0x6a1a4bcddef96f41!2sPremium%20Wash%20laundry!5e0!3m2!1sen!2sgh!4v1750078468624!5m2!1sen!2sgh",
  },
  {
    name: "Danyame Branch",
    address: "O'Lady's Pub Building, Miklin Hotel road, Kumasi",
    googleMapsUrl: "https://maps.app.goo.gl/mtKhb2CHur1m6sN5A",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63403.96902112422!2d-1.7081128783202877!3d6.678103000000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb97005813acb3%3A0x49beecec97dbb901!2sPREMIUM%20WASH!5e0!3m2!1sen!2sgh!4v1750091940080!5m2!1sen!2sgh",
  },
];

const LocationsMap = () => {
  return (
    <section
      className="bg-[var(--sky-bg)] text-[var(--text-primary)] py-16 px-6"
      id="locations"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Our Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden shadow-md border border-[var(--gray-bg)] bg-white transition transform hover:scale-[1.01]"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{loc.name}</h3>
                <p className="text-[var(--text-secondary)] mb-3">
                  {loc.address}
                </p>
                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-color)] underline hover:text-[var(--primary-hover)] font-medium"
                >
                  Open in Google Maps
                </a>
              </div>
              <iframe
                title={loc.name}
                src={loc.embedSrc}
                width="100%"
                height="250"
                allowFullScreen
                loading="lazy"
                className="border-t border-[var(--gray-bg)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsMap;
