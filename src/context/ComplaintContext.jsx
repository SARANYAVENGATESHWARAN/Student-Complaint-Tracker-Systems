import React, { createContext, useContext, useReducer, useEffect } from 'react';
import complaintsData from '../data/complaints.json';
import usersData from '../data/users.json';

const ComplaintContext = createContext();

const complaintReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_COMPLAINTS':
      return { ...state, complaints: action.payload };
    case 'ADD_COMPLAINT':
      return { ...state, complaints: [...state.complaints, action.payload] };
    case 'UPDATE_COMPLAINT':
      return {
        ...state,
        complaints: state.complaints.map(complaint =>
          complaint.id === action.payload.id ? action.payload : complaint
        )
      };
    case 'DELETE_COMPLAINT':
      return {
        ...state,
        complaints: state.complaints.filter(complaint => complaint.id !== action.payload)
      };
    default:
      return state;
  }
};

export const ComplaintProvider = ({ children }) => {
  const [state, dispatch] = useReducer(complaintReducer, {
    complaints: []
  });

  useEffect(() => {
    dispatch({ type: 'LOAD_COMPLAINTS', payload: complaintsData });
  }, []);

  const submitComplaint = (complaintData, studentId, studentName) => {
    const newComplaint = {
      id: Math.max(...state.complaints.map(c => c.id)) + 1,
      studentId,
      studentName,
      ...complaintData,
      status: 'Pending',
      assignedTo: null,
      assignedFacultyName: null,
      reply: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_COMPLAINT', payload: newComplaint });
    return newComplaint;
  };

  const updateComplaint = (complaintId, updates) => {
    const complaint = state.complaints.find(c => c.id === complaintId);
    if (complaint) {
      const updatedComplaint = {
        ...complaint,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      dispatch({ type: 'UPDATE_COMPLAINT', payload: updatedComplaint });
      return updatedComplaint;
    }
    return null;
  };

  const assignComplaint = (complaintId, facultyId) => {
    const faculty = usersData.find(u => u.id === facultyId && u.role === 'faculty');
    if (faculty) {
      return updateComplaint(complaintId, {
        assignedTo: facultyId,
        assignedFacultyName: faculty.name
      });
    }
    return null;
  };

  const updateStatus = (complaintId, status, reply = '') => {
    return updateComplaint(complaintId, { status, reply });
  };

  const deleteComplaint = (complaintId) => {
    dispatch({ type: 'DELETE_COMPLAINT', payload: complaintId });
  };

  const getComplaintsByStudent = (studentId) => {
    return state.complaints.filter(c => c.studentId === studentId);
  };

  const getComplaintsByFaculty = (facultyId) => {
    return state.complaints.filter(c => c.assignedTo === facultyId);
  };

  const getComplaintStats = () => {
    const total = state.complaints.length;
    const pending = state.complaints.filter(c => c.status === 'Pending').length;
    const inProgress = state.complaints.filter(c => c.status === 'In-progress').length;
    const resolved = state.complaints.filter(c => c.status === 'Resolved').length;
    const completed = state.complaints.filter(c => c.status === 'Completed').length;

    const byCategory = state.complaints.reduce((acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1;
      return acc;
    }, {});

    return { total, pending, inProgress, resolved, completed, byCategory };
  };

  return (
    <ComplaintContext.Provider value={{
      complaints: state.complaints,
      submitComplaint,
      updateComplaint,
      assignComplaint,
      updateStatus,
      deleteComplaint,
      getComplaintsByStudent,
      getComplaintsByFaculty,
      getComplaintStats
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};