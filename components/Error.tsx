export default function Error({ message }: { message?: string }) {
  return (
    <p className="error-message">{message ?? "Error happened on the server"}</p>
  );
}
