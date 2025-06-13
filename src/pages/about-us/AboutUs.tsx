import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './about-us.module.css';
import Andrey from '../../assets/images/members/Andrey.jpg';
import Аndrey from '../../assets/images/members/Аndrey.jpg';
import Alexander from '../../assets/images/members/Alexander.jpg';

const teamMembers = [
  {
    id: 1,
    name: 'Andrey',
    role: 'Frontend Developer',
    bio: 'Andrey is a junior frontend developer who enjoys translating ideas into real-world applications. He’s focused on writing clean code and continuously learning best practices.',
    contributions:
      'He implemented several key pages, handled form functionality, and helped configure the development environment and deployment process.',
    github: 'https://github.com/heyArtik-dev',
    photo: Аndrey,
  },
  {
    id: 2,
    name: 'Alexander',
    role: 'Frontend Developer',
    bio: 'Alexander is a motivated self-learner passionate about frontend development. He strives to create clean, user-friendly interfaces and write maintainable code.',
    contributions:
      'He implemented several key pages, handled form functionality, and helped configure the development environment and deployment process.',
    github: 'https://github.com/sashaSVNT',
    photo: Alexander,
  },
  {
    id: 3,
    name: 'Andrey',
    role: 'Frontend Developer',
    bio: 'Andrey is an enthusiastic junior developer with a strong interest in building modern web applications. He enjoys learning new technologies and improving his frontend skills.',
    contributions:
      'Andrey focused on implementing responsive layouts and reusable components, while also contributing to project setup and state management.',
    github: 'https://github.com/0404233',
    photo: Andrey,
  },
];

function AboutUs() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true
  };

  return (
    <div>
      <div className={styles['sliderContainer']}>
        <Slider {...settings}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles['memberCard']}>
              <img src={member.photo} alt={`${member.name}`} className={styles['avatar']} />
              <div>
                <h2>{member.name}</h2>
                <h3>{member.role}</h3>
                <p>
                  <strong>Bio:</strong> {member.bio}
                </p>
                <p>
                  <strong>Contributions:</strong> {member.contributions}
                </p>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles['teamSummary']}>
        <h1>Meet Our Frontend Team</h1>
        <p>
          We're a team of aspiring frontend developers passionate about learning and building real-world web
          applications. Although we're at the beginning of our development journey, we've come together to create a
          project that reflects our dedication, curiosity, and willingness to grow.
        </p>

        <h2>How We Worked Together</h2>
        <ul>
          <li>
            <strong>Daily check-ins:</strong> Short syncs to share progress and get help when facing challenges.
          </li>
          <li>
            <strong>Task Breakdown:</strong> We divided features based on our interests and strengths, allowing everyone
            to contribute meaningfully.
          </li>
          <li>
            <strong>Code Collaboration:</strong> We regularly reviewed each other’s code and shared feedback to learn
            best practices.
          </li>
          <li>
            <strong>Pair Work:</strong> When one of us faced difficulties, we paired up to solve issues together.
          </li>
          <li>
            <strong>Version Control:</strong> We used GitHub to manage our codebase and learn about branches, pull
            requests, and merging.
          </li>
          <li>
            <strong>Deployment Practice:</strong> We explored basic CI/CD processes and practiced deploying our app for
            the first time.
          </li>
        </ul>

        <p>
          By working as a team, we not only completed this project but also gained valuable experience in collaboration,
          communication, and frontend development. This is just the beginning for us, and we're excited for what's next.
        </p>
      </div>

      <a href="https://rs.school/" className={styles['rssLink']} aria-label="RS School" target="_blank" />
    </div>
  );
}

export default AboutUs;
