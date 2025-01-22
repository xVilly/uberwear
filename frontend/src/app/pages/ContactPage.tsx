export function ContactPage() {
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
          fontSize: '3.0rem',
          marginBottom: '1rem',
        }}
      >
        Kontakt
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: -10,
            width: '90%',
            height: '3px',
            backgroundColor: 'rgba(255, 193, 7, 0.8)',
          }}
        ></span>
      </h1>
      <p style={{ fontSize: '1.6rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        Masz pytania? Skontaktuj się z nami! Jesteśmy tutaj, aby pomóc Ci w każdej sprawie dotyczącej naszej firmy.
      </p>
      <div>
        <h2 style={{ position: 'relative', fontSize: '2.6rem', marginBottom: '1rem' }}>
          Dane kontaktowe
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: -5,
              width: '70%',
              height: '3px',
              backgroundColor: 'rgba(255, 193, 7, 0.8)',
            }}
          ></span>
        </h2>
        <p style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
          📧 Email: kontakt@quickfit.pl
        </p>
        <p style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
          📞 Telefon: +48 123 456 789
        </p>
        <p style={{ fontSize: '1.35rem', marginBottom: '2rem' }}>
          🏢 Adres: ul. Bawełniana 65, 30-123 Kraków
        </p>
      </div>
      <div>
        <h2 style={{ position: 'relative', fontSize: '2.4rem', marginBottom: '1rem' }}>
          Chcesz założyć własny sklep?
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: -5,
              width: '40%',
              height: '3px',
              backgroundColor: 'rgba(255, 193, 7, 0.8)',
            }}
          ></span>
        </h2>
        <p style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>
          QuickFit oferuje wyjątkową możliwość rejestracji własnego sklepu. Rozpocznij sprzedaż w naszym systemie i
          dotrzyj do tysięcy klientów w całej Polsce. Napisz do nas!
        </p>
      </div>
    </div>
  );
}
