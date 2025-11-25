export default function ContactPage() {
  return (
    <section className="max-w-[800px] mx-auto px-4 py-20 text-center space-y-6">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>

      <p className="text-lg text-zinc-300">
        I&apos;m currently open for bookings, collaborations, and media pass
        opportunities. Feel free to reach out anytime.
      </p>

      <div className="space-y-3 text-lg">
        <p>Email: <a href="mailto:YOUR_EMAIL" className="underline">YOUR_EMAIL</a></p>
        <p>Instagram: <a href="https://instagram.com/YOUR_HANDLE" className="underline">@YOUR_HANDLE</a></p>
        <p>LinkedIn: <a href="YOUR_LINK" className="underline">View Profile</a></p>
      </div>
    </section>
  );
}
