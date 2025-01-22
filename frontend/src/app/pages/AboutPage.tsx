export function AboutPage() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F3F4F6',
        color: '#1E3A5F',
        fontFamily: "'Playfair Display', serif",
        flexDirection: 'column',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1
        style={{
          position: 'relative',
          fontSize: '2.5rem',
          marginBottom: '1rem',
        }}
      >
        O nas
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: -10,
            width: '100%',
            height: '5px',
            backgroundColor: 'rgba(255, 193, 7, 0.8)',
          }}
        ></span>
      </h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
        Witaj w QuickFit – Twoim zaufanym partnerze w dostawie ubrań! Nasza misja to łączenie wygody, stylu i szybkości
        w jedną usługę, która zrewolucjonizuje sposób, w jaki kupujesz ubrania.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginTop: '1rem' }}>
        Dzięki naszej zaawansowanej logistyce i współpracy z najlepszymi markami, Twoje zamówienie dotrze do Ciebie
        szybciej niż kiedykolwiek.
      </p>
    </div>
  );
}
