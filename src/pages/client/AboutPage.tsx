import React from "react";
import Navbar from "../../components/Navbar";
import { Clock, MapPin, Mail, Phone } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-medium mb-6 text-center">
            About Our Gallery
          </h1>

          <div className="aspect-video mb-10 rounded-lg overflow-hidden shadow-subtle">
            <img
              src="https://images.unsplash.com/photo-1577720643272-265f09367456?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Art Gallery Interior"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg mx-auto mb-12">
            <p>
              Welcome to our contemporary art gallery, a space dedicated to
              showcasing exceptional artworks from both established masters and
              emerging talents. Since our founding in 2010, we've been committed
              to creating a platform where art enthusiasts can discover,
              experience, and acquire remarkable pieces.
            </p>
            <p>
              Our gallery specializes in a diverse range of mediums including
              paintings, sculptures, photography, digital art, and mixed-media
              installations. We believe in the transformative power of art and
              its ability to inspire, challenge, and connect people across
              cultural boundaries.
            </p>
            <p>
              Through our carefully curated exhibitions and online auctions, we
              aim to foster meaningful dialogues between artists, collectors,
              and the broader community. Our team of dedicated curators and art
              specialists work closely with artists to present their work in
              thoughtful, engaging contexts.
            </p>
            <p>
              Beyond exhibitions, we offer art advisory services, hosting
              educational programs, and organize community events to make art
              accessible to wider audiences. Whether you're a seasoned collector
              or simply curious about contemporary art, we invite you to explore
              our gallery and engage with the vibrant artistic expressions of
              our time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gallery-beige/30 p-8 rounded-lg">
              <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
              <p className="text-gallery-text/80 leading-relaxed">
                To cultivate a dynamic environment where artists can thrive,
                collectors can discover exceptional works, and the public can
                engage with contemporary art in meaningful ways. We strive to
                support artistic innovation while preserving the rich traditions
                of various art forms.
              </p>
            </div>

            <div className="bg-gallery-beige/30 p-8 rounded-lg">
              <h2 className="text-2xl font-medium mb-4">Our Vision</h2>
              <p className="text-gallery-text/80 leading-relaxed">
                To be a leading platform for artistic expression and cultural
                exchange, connecting diverse communities through the universal
                language of art. We envision a world where art is valued not
                just for its aesthetic qualities but for its ability to inspire
                change and foster understanding.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-subtle rounded-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-medium mb-6">Visit Us</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gallery-accent mt-1" size={20} />
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-gallery-text/70">
                        123 Gallery Street
                        <br />
                        Art District, NY 10001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-gallery-accent mt-1" size={20} />
                    <div>
                      <h3 className="font-medium mb-1">Gallery Hours</h3>
                      <p className="text-gallery-text/70">
                        Tuesday - Friday: 10:00 AM - 6:00 PM
                        <br />
                        Saturday: 11:00 AM - 5:00 PM
                        <br />
                        Sunday & Monday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="text-gallery-accent mt-1" size={20} />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gallery-text/70">
                        +1 (212) 555-0123
                        <br />
                        +1 (212) 555-0124
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="text-gallery-accent mt-1" size={20} />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gallery-text/70">
                        info@artgallery.com
                        <br />
                        inquiries@artgallery.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[16/5] w-full">
              <img
                src="https://images.unsplash.com/photo-1594733606504-9c5a5337fd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt="Gallery Exterior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
