import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Seo from '@components/head';
import { Layout } from '@components';
import { email } from '@config';

// Keep this in step with the app. Every claim here was checked against the FREED
// codebase on the date below; adding analytics, crash reporting or push
// notifications means this page must change first.
const UPDATED = '12 November 2026';

const StyledMain = styled.main`
  max-width: 760px;

  header {
    margin-bottom: 40px;
  }

  // The global 100px section padding is for the homepage; headings space this page.
  section {
    padding: 0;
  }

  h2 {
    margin: 2.5em 0 0.75em;
    color: var(--lightest-slate);
    font-size: clamp(22px, 4vw, var(--fz-heading));
  }

  h3 {
    margin: 1.75em 0 0.5em;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
  }

  p,
  li {
    color: var(--light-slate);
    line-height: 1.6;
  }

  p {
    margin: 0 0 1em;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  .summary {
    padding: 1.5rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
  }

  .contact {
    margin-bottom: 100px;
  }
`;

const Mail = () => <a href={`mailto:${email}`}>{email}</a>;

const FreedPrivacyPolicy = ({ location }) => (
  <Layout location={location}>
    <StyledMain>
      <header>
        <h1 className="medium-heading">FREED Privacy Policy</h1>
        <p className="subtitle">Last updated {UPDATED}</p>
        <p>
          This policy explains what the FREED app collects, where it goes and what you can do about
          it. FREED is made by Lloyd Armstrong, an independent developer in the UK. In this policy,
          &quot;we&quot; means Lloyd Armstrong. Under UK data protection law, we are the controller
          of your personal data. If you have a question, email <Mail />.
        </p>
      </header>

      <section className="summary">
        <h2 style={{ marginTop: 0 }}>The short version</h2>
        <ul>
          <li>FREED never connects to your bank and never asks for bank logins.</li>
          <li>
            Your money details stay on your phone. If you turn on backup, they are encrypted on your
            phone before they are uploaded, and we can&apos;t read them.
          </li>
          <li>
            There are no adverts, analytics or tracking tools in FREED. We don&apos;t sell your data
            or share it with anyone for marketing.
          </li>
        </ul>
      </section>

      <section>
        <h2>What stays on your phone</h2>
        <p>
          Everything you type into FREED is saved in the app&apos;s own storage on your phone. That
          includes your pay, hours, job costs, spending, bills, housing costs, debts, savings,
          pension, goals, the prices you check on Decide, your score history and your answers during
          setup.
        </p>
        <p>
          Your score and your real hourly rate are worked out on your phone. None of this is sent to
          us. If you delete the app without turning on backup, this data is gone for good.
        </p>
      </section>

      <section>
        <h2>What reaches our servers</h2>

        <h3>A random ID</h3>
        <p>
          When you first open FREED, the app creates an anonymous account with our sign-in provider.
          It is a random ID with no name, email address or money details attached. It is there so
          that if you sign in later, you keep the same account.
        </p>

        <h3>Your sign-in details, if you make an account</h3>
        <ul>
          <li>
            <strong>Email:</strong> your email address. We send a code to it each time you sign in.
          </li>
          <li>
            <strong>Sign in with Apple:</strong> Apple gives us an ID for your Apple account and
            your email address. If you choose Hide My Email, we only get Apple&apos;s relay address.
            FREED doesn&apos;t keep your name.
          </li>
          <li>
            <strong>Sign in with Google:</strong> Google gives us an ID for your Google account,
            your email address, your name and a link to your profile picture. Our sign-in provider
            stores these with your account. FREED doesn&apos;t use your name or picture.
          </li>
        </ul>

        <h3>Your encrypted backup, if you turn it on</h3>
        <p>
          Backup is there so you can get your data back if you lose your phone. When you turn it on,
          your phone makes a recovery code and shows it to you once. The code is never sent to us.
        </p>
        <ul>
          <li>
            Your data is encrypted on your phone with AES-256, using a key made from your recovery
            code. Only the encrypted copy is uploaded.
          </li>
          <li>
            The backup is stored without your name, email, account ID or a date. We can&apos;t tell
            whose it is.
          </li>
          <li>
            We store one random value against your account. It shows that a backup exists, but it
            can&apos;t open it.
          </li>
          <li>
            If your data has changed, the app uploads a new encrypted copy in place of the old one
            when you open or leave the app.
          </li>
          <li>
            If you lose your recovery code, nobody can open your backup, including us. You can make
            a new code from your phone while you are signed in. This replaces the old backup.
          </li>
        </ul>

        <h3>Technical details</h3>
        <p>
          Like most online services, our servers log basic details each time your phone connects,
          such as your IP address, the time and the type of device and app. We use these to keep the
          service working and to stop misuse.
        </p>

        <h3>Tax rates and app updates</h3>
        <p>
          FREED downloads the current UK tax rates from our server, and checks Expo&apos;s servers
          for app updates. The update check sends your app version, your phone&apos;s operating
          system and a random ID for your copy of the app. Neither sends anything you have typed
          into FREED.
        </p>
      </section>

      <section>
        <h2>Notifications</h2>
        <p>
          If you allow notifications, reminders such as your monthly pay check-in are set up on your
          phone. We don&apos;t send them from a server and we don&apos;t collect a notification
          token. You can turn them off in FREED or in your phone&apos;s settings.
        </p>
      </section>

      <section>
        <h2>What we don&apos;t do</h2>
        <ul>
          <li>Connect to your bank or ask for any bank, card or pension logins.</li>
          <li>Show adverts, or use analytics or tracking tools.</li>
          <li>Track you across other apps or websites.</li>
          <li>Sell your data, or share it with advertisers or data brokers.</li>
          <li>Access your location, contacts, photos, camera or microphone.</li>
          <li>Use your data to make decisions about you outside the app.</li>
        </ul>
      </section>

      <section>
        <h2>Why we use your data</h2>
        <p>UK data protection law says we must have a reason for using your data. Ours are:</p>
        <ul>
          <li>
            <strong>To give you the service you asked for.</strong> This covers your account,
            sign-in codes and backup.
          </li>
          <li>
            <strong>Legitimate interests.</strong> This covers the random ID and technical logs,
            which we need to run FREED and keep it secure.
          </li>
        </ul>
      </section>

      <section>
        <h2>Who helps us run FREED</h2>
        <p>
          These companies handle data on our behalf. None of them receive the money details you
          enter, except Supabase, which only ever holds your backup in encrypted form.
        </p>
        <ul>
          <li>
            <a href="https://supabase.com/privacy">Supabase</a> runs our sign-in, sends sign-in
            codes and stores encrypted backups. Our data is held in London. Supabase is a US
            company. If its staff need to access data from outside the UK, that is covered by the
            safeguards UK law requires.
          </li>
          <li>
            <a href="https://www.apple.com/legal/privacy/">Apple</a> and{' '}
            <a href="https://policies.google.com/privacy">Google</a> handle sign-in if you use them,
            and run the App Store and Google Play.
          </li>
          <li>
            <a href="https://expo.dev/privacy">Expo</a> delivers app updates.
          </li>
        </ul>
        <p>
          We would only share data with anyone else if the law required it, for example a valid
          court order.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <ul>
          <li>
            <strong>Data on your phone:</strong> until you delete it in the app or remove the app.
          </li>
          <li>
            <strong>Your backup:</strong> until you delete your account in the app or ask us to
            delete it.
          </li>
          <li>
            <strong>Your sign-in details:</strong> until you ask us to delete them. Deleting your
            account in the app removes everything on your phone and your backup, but it does not yet
            remove your sign-in details. To remove those, email <Mail /> from the address you signed
            in with. We will delete them within one month.
          </li>
          <li>
            <strong>Random IDs with no account:</strong> these hold nothing about you. We may delete
            unused ones at any time.
          </li>
          <li>
            <strong>Technical logs:</strong> kept for a short time by our providers, then deleted.
          </li>
        </ul>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>Under UK data protection law, you can ask us to:</p>
        <ul>
          <li>give you a copy of your data</li>
          <li>correct it</li>
          <li>delete it</li>
          <li>stop or limit how we use it</li>
          <li>give it to you in a format you can take elsewhere</li>
        </ul>
        <p>
          You can do most of this yourself in the app. Go to{' '}
          <strong>Me &gt; Privacy &amp; data</strong> to export everything on your phone as a file,
          or to delete your account. You can change any figure on the Money tab.
        </p>
        <p>
          For anything else, email <Mail />. We will reply within one month. If you are unhappy with
          how we have handled your data, you can complain to the Information Commissioner&apos;s
          Office at <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk</a> or on 0303 123
          1113.
        </p>
      </section>

      <section>
        <h2>Keeping your data safe</h2>
        <ul>
          <li>Your backup is encrypted on your phone before it is uploaded.</li>
          <li>
            The key that opens your backup is kept in your phone&apos;s secure storage (Keychain on
            iPhone, Keystore on Android).
          </li>
          <li>Everything sent between the app and our servers is encrypted in transit.</li>
          <li>Our database only lets each person reach their own records.</li>
        </ul>
        <p>
          The data on your phone is protected by your phone&apos;s own security, so we recommend
          using a passcode or Face ID.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          FREED is made for adults managing their own money. It isn&apos;t meant for children, and
          we don&apos;t knowingly collect data from anyone under 13. If you think a child has made
          an account, email us and we will delete it.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          If we change this policy, we will update this page and the date at the top. If we start
          collecting something new, such as analytics, we will tell you in the app before it starts.
        </p>
      </section>

      <section className="contact">
        <h2>Contact</h2>
        <p>
          Lloyd Armstrong, United Kingdom
          <br />
          <Mail />
        </p>
      </section>
    </StyledMain>
  </Layout>
);

FreedPrivacyPolicy.propTypes = {
  location: PropTypes.object.isRequired,
};

export default FreedPrivacyPolicy;

export const Head = ({ location }) => (
  <Seo
    title="FREED Privacy Policy"
    description="What the FREED app collects, where it goes, and what you can do about it."
    pathname={location.pathname}
  />
);

Head.propTypes = {
  location: PropTypes.object.isRequired,
};
