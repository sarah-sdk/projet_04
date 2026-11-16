import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { authService } from "../services/auth.service";
import { Session } from "../types";
import SessionCard from "../components/SessionCard";

function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const user = authService.getCurrentUser();
  const token = authService.getToken();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async (): Promise<any> => {
    try {
      setLoading(true);
      const response = await api.get<Session[]>("/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSessions(response.data);
    } catch (err: any) {
      setError("Failed to load sessions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sessionId: any): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this session?")) {
      return;
    }

    try {
      await api.delete(`/session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSessions();
    } catch (err: any) {
      alert("Failed to delete session");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading sessions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Yoga Sessions</h1>
          {user && user.admin ? (
            <Link
              to="/sessions/create"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Create Session
            </Link>
          ) : null}
        </div>

        {sessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No sessions available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session: any) => (
              <SessionCard
                key={session.id}
                session={session}
                isAdmin={user.isAdmin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sessions;
