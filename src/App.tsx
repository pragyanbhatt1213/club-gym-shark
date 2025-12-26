import { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, ChevronRight } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [bmiData, setBmiData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    activity: 'moderate'
  });
  const [bmiResult, setBmiResult] = useState<{bmi: number; category: string} | null>(null);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Reveal on scroll animation
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      reveals.forEach(reveal => revealObserver.unobserve(reveal));
    };
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/919893366490', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919893366490';
  };

  const calculateBMI = () => {
    const heightM = parseFloat(bmiData.height) / 100;
    const weightKg = parseFloat(bmiData.weight);
    
    if (heightM && weightKg && heightM > 0) {
      const bmi = weightKg / (heightM * heightM);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Healthy';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiResult({ bmi: parseFloat(bmi.toFixed(1)), category });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Sticky Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
              <span className="font-anton text-2xl">GS</span>
            </div>
            <span className="font-anton text-xl tracking-wider">CLUB GYM SHARK</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 uppercase text-sm tracking-widest">
            <a href="#home" className="hover:text-shark-orange transition-colors border-b-2 border-transparent hover:border-shark-orange pb-1">Home</a>
            <a href="#services" className="hover:text-shark-orange transition-colors border-b-2 border-transparent hover:border-shark-orange pb-1">Services</a>
            <a href="#bmi" className="hover:text-shark-orange transition-colors border-b-2 border-transparent hover:border-shark-orange pb-1">BMI</a>
            <a href="#trainers" className="hover:text-shark-orange transition-colors border-b-2 border-transparent hover:border-shark-orange pb-1">Trainers</a>
            <a href="#plans" className="hover:text-shark-orange transition-colors border-b-2 border-transparent hover:border-shark-orange pb-1">Plans</a>
            <a href="#contact" className="hover:text-shark-orange transition-colors border-b-2 border-transparent hover:border-shark-orange pb-1">Contact</a>
          </nav>
        </div>
      </header>

      {/* Floating Action Pills */}
      <div className="fixed top-24 right-6 z-40 flex flex-col gap-3">
        <button 
          onClick={handleCall}
          className="glass-pill px-6 py-3 rounded-full flex items-center gap-2 hover:bg-shark-orange/80 transition-all uppercase text-xs tracking-widest font-bold"
          data-testid="floating-call-button"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden lg:inline">Call</span>
        </button>
        <button 
          onClick={handleWhatsApp}
          className="glass-pill px-6 py-3 rounded-full flex items-center gap-2 hover:bg-green-600/80 transition-all uppercase text-xs tracking-widest font-bold"
          data-testid="floating-whatsapp-button"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden lg:inline">WhatsApp</span>
        </button>
      </div>

      {/* Hero Section - Diagonal Split */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1 className="font-anton text-[12vw] leading-none text-center select-none">
            <div className="text-stroke-thick">NOT</div>
            <div className="text-white">YOUR</div>
            <div className="text-stroke-thick">TYPICAL</div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-stroke-thick">FITN</span>
              <span className="text-white">E</span>
              <span className="text-stroke-thick">SS</span>
            </div>
          </h1>
        </div>

        {/* Diagonal Split Images */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full relative diagonal-clip-left">
            <img 
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&h=1600&fit=crop&auto=format&q=80"
              alt="Intense male workout"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <div className="w-1/2 h-full relative diagonal-clip-right">
            <img 
              src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1200&h=1600&fit=crop&auto=format&q=80"
              alt="Powerful female training"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Services - Action Tiles */}
      <section id="services" className="py-0">
        <div className="grid md:grid-cols-3">
          {/* Progression Tile */}
          <div className="action-tile h-[70vh] relative cursor-pointer" data-testid="progression-tile">
            <img 
              src="https://images.unsplash.com/photo-1603077492340-e6e62b2a688b?w=800&h=1200&fit=crop&auto=format&q=80"
              alt="Progression tracking"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-16 mb-6">
                <svg className="w-full h-full stroke-current stroke-1" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-anton text-5xl mb-4 tracking-wider">PROGRESSION</h3>
              <p className="text-base max-w-sm leading-relaxed">
                Track your journey with data-driven insights. Monitor strength gains, endurance improvements, and body composition changes.
              </p>
            </div>
          </div>

          {/* Workout Tile */}
          <div className="action-tile h-[70vh] relative cursor-pointer" data-testid="workout-tile">
            <img 
              src="https://images.unsplash.com/photo-1653773869760-5b0f846231fb?w=800&h=1200&fit=crop&auto=format&q=80"
              alt="Intense workout"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-16 mb-6">
                <svg className="w-full h-full stroke-current stroke-1" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                  <path d="M5 12h14M5 5h14M5 19h14" />
                </svg>
              </div>
              <h3 className="font-anton text-5xl mb-4 tracking-wider">WORKOUT</h3>
              <p className="text-base max-w-sm leading-relaxed">
                Structured training programs designed for maximum results. From beginner-friendly to advanced athlete protocols.
              </p>
            </div>
          </div>

          {/* Nutrition Tile */}
          <div className="action-tile h-[70vh] relative cursor-pointer" data-testid="nutrition-tile">
            <img 
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=1200&fit=crop&auto=format&q=80"
              alt="Nutrition and wellness"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-16 mb-6">
                <svg className="w-full h-full stroke-current stroke-1" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h3 className="font-anton text-5xl mb-4 tracking-wider">NUTRITION</h3>
              <p className="text-base max-w-sm leading-relaxed">
                Fuel your transformation with science-backed nutrition guidance. Personalized meal strategies for your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section id="bmi" className="py-24 px-6 bg-white text-black reveal">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="font-anton text-6xl md:text-8xl mb-6 tracking-tight">WHAT IS BMI</h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Body Mass Index is a numerical value derived from your height and weight. 
              Calculate your BMI below to understand your current fitness baseline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* BMI Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Height / cm"
                  value={bmiData.height}
                  onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                  className="px-6 py-4 border border-black bg-transparent focus:outline-none focus:border-shark-orange"
                  data-testid="bmi-height-input"
                />
                <input
                  type="number"
                  placeholder="Weight / kg"
                  value={bmiData.weight}
                  onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                  className="px-6 py-4 border border-black bg-transparent focus:outline-none focus:border-shark-orange"
                  data-testid="bmi-weight-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Age"
                  value={bmiData.age}
                  onChange={(e) => setBmiData({...bmiData, age: e.target.value})}
                  className="px-6 py-4 border border-black bg-transparent focus:outline-none focus:border-shark-orange"
                  data-testid="bmi-age-input"
                />
                <select
                  value={bmiData.gender}
                  onChange={(e) => setBmiData({...bmiData, gender: e.target.value})}
                  className="px-6 py-4 border border-black bg-transparent focus:outline-none focus:border-shark-orange appearance-none"
                  data-testid="bmi-gender-select"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <select
                value={bmiData.activity}
                onChange={(e) => setBmiData({...bmiData, activity: e.target.value})}
                className="w-full px-6 py-4 border border-black bg-transparent focus:outline-none focus:border-shark-orange appearance-none"
                data-testid="bmi-activity-select"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very-active">Very Active (intense exercise daily)</option>
              </select>

              <button
                onClick={calculateBMI}
                className="w-full bg-black text-white px-8 py-4 hover:bg-shark-orange transition-colors flex items-center justify-center gap-3 font-bold uppercase tracking-widest"
                data-testid="bmi-calculate-button"
              >
                Calculate
                <ChevronRight className="w-5 h-5" />
              </button>

              {bmiResult && (
                <div className="mt-6 p-6 border-2 border-shark-orange bg-shark-orange/5" data-testid="bmi-result">
                  <p className="text-2xl font-bold mb-2">Your BMI: {bmiResult.bmi}</p>
                  <p className="text-lg">Category: <span className="font-bold">{bmiResult.category}</span></p>
                </div>
              )}
            </div>

            {/* BMI Table */}
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-4 font-anton text-xl tracking-wider">BMI</th>
                    <th className="text-left py-4 font-anton text-xl tracking-wider">WEIGHT STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  <tr>
                    <td className="py-4 font-medium">Below 18.5</td>
                    <td className="py-4">Underweight</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">18.5 - 24.9</td>
                    <td className="py-4">Healthy</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">25.0 - 29.9</td>
                    <td className="py-4">Overweight</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">30.0 and Above</td>
                    <td className="py-4">Obese</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-6 text-sm text-gray-600">
                <span className="font-bold">BMR:</span> Metabolic Rate / 
                <span className="font-bold"> BMI:</span> Body Mass Index
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-24 px-6 bg-black reveal">
        <div className="container mx-auto">
          <h2 className="font-anton text-6xl md:text-8xl mb-16 text-center tracking-tight">
            MEET THE <span className="text-stroke-thick">TEAM</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Trainer 1 - Matie */}
            <div className="trainer-card h-[600px] relative cursor-pointer" data-testid="trainer-card-matie">
              <img 
                src="https://images.unsplash.com/photo-1593250994631-7c09aea2ed3f?w=600&h=900&fit=crop&auto=format&q=80"
                alt="Trainer Matie"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="trainer-name">MATIE</div>
            </div>

            {/* Trainer 2 - Madison */}
            <div className="trainer-card h-[600px] relative cursor-pointer" data-testid="trainer-card-madison">
              <img 
                src="https://images.unsplash.com/photo-1579156618568-a641377ae974?w=600&h=900&fit=crop&auto=format&q=80"
                alt="Trainer Madison"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="trainer-name">MADISON</div>
            </div>

            {/* Trainer 3 - Joshua */}
            <div className="trainer-card h-[600px] relative cursor-pointer" data-testid="trainer-card-joshua">
              <img 
                src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?w=600&h=900&fit=crop&auto=compress&cs=tinysrgb"
                alt="Trainer Joshua"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="trainer-name">JOSHUA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="py-24 px-6 bg-white text-black reveal">
        <div className="container mx-auto">
          <h2 className="font-anton text-6xl md:text-8xl mb-16 text-center tracking-tight">MEMBERSHIP</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Monthly */}
            <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group" data-testid="plan-monthly">
              <h3 className="font-anton text-4xl mb-4 tracking-wider">MONTHLY</h3>
              <p className="mb-6 text-gray-600 group-hover:text-gray-300">
                Perfect for trying out our gym and getting started on your fitness journey.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>Full gym access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>All equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>Trainer guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>Flexible timing</span>
                </li>
              </ul>
            </div>

            {/* Quarterly - Featured */}
            <div className="border-2 border-shark-orange p-8 bg-shark-orange text-white transform md:scale-105" data-testid="plan-quarterly">
              <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold mb-4 uppercase tracking-widest">
                Popular
              </div>
              <h3 className="font-anton text-4xl mb-4 tracking-wider">QUARTERLY</h3>
              <p className="mb-6">
                Best value for serious fitness enthusiasts committed to transformation.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span>●</span>
                  <span>Full gym access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>●</span>
                  <span>All equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>●</span>
                  <span>Trainer guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>●</span>
                  <span>Special offers</span>
                </li>
              </ul>
            </div>

            {/* Yearly */}
            <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group" data-testid="plan-yearly">
              <h3 className="font-anton text-4xl mb-4 tracking-wider">YEARLY</h3>
              <p className="mb-6 text-gray-600 group-hover:text-gray-300">
                Maximum savings for dedicated members committed to long-term fitness.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>Full gym access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>All equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-shark-orange">●</span>
                  <span>Best pricing</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl mb-6">
              Contact us to know current offers and pricing
            </p>
            <button
              onClick={handleWhatsApp}
              className="bg-black text-white px-12 py-4 hover:bg-shark-orange transition-colors uppercase tracking-widest font-bold"
              data-testid="join-now-button"
            >
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 bg-black reveal">
        <div className="container mx-auto">
          <h2 className="font-anton text-6xl md:text-8xl mb-16 text-center tracking-tight">
            THE <span className="text-stroke-thick">SPACE</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {[
              'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
              'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg',
              'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg',
              'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
              'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
              'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg',
              'https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg',
              'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg'
            ].map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden">
                <img 
                  src={img}
                  alt={`Gym facility ${idx + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white text-black reveal">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-anton text-6xl md:text-8xl mb-16 text-center tracking-tight">GET IN TOUCH</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="border-2 border-black p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-anton text-2xl mb-2 tracking-wider">ADDRESS</h3>
                    <p className="leading-relaxed">
                      S11 Second Floor, Guru Kripa Tower,<br />
                      Near Vishal Mega Mart,<br />
                      Sarvdharm Colony, Kolar Rd,<br />
                      Bhopal, Madhya Pradesh 462042
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-black p-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-anton text-2xl mb-2 tracking-wider">PHONE</h3>
                    <p className="text-xl font-bold">098933 66490</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCall}
                  className="flex-1 bg-black text-white px-6 py-4 hover:bg-shark-orange transition-colors flex items-center justify-center gap-2 uppercase tracking-widest font-bold"
                  data-testid="contact-call-button"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-600 text-white px-6 py-4 hover:bg-green-700 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest font-bold"
                  data-testid="contact-whatsapp-button"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
              </div>
            </div>

            <div className="h-[500px] border-2 border-black overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.4167524468744!2d77.44284087536632!3d23.215891979056566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c426c9f17f3f7%3A0x15c6f9b4d1f7e37a!2sS11%20Second%20Floor%2C%20Guru%20Kripa%20Tower%2C%20Near%20Vishal%20Mega%20Mart%2C%20Sarvdharm%20Colony%2C%20Kolar%20Rd%2C%20Bhopal%2C%20Madhya%20Pradesh%20462042!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 border-2 border-white flex items-center justify-center">
              <span className="font-anton text-xl">GS</span>
            </div>
            <span className="font-anton text-2xl tracking-wider">CLUB GYM SHARK</span>
          </div>
          <p className="text-gray-400 mb-2">Kolar Road, Bhopal</p>
          <p className="text-gray-600 text-sm">Not Your Typical Fitness</p>
          <p className="text-gray-700 text-xs mt-4">© {new Date().getFullYear()} Club Gym Shark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
