import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { toast, Id } from 'react-toastify';

import AdminApi from '../services/admin-api';

export const queryClient = new QueryClient();

const AdminApiClient = AdminApi.getInstance();

export const useGetRecordings = () => useQuery(['recordings'], AdminApiClient.getRecordings);

export const useGetTabs = () => useQuery(['tabs'], AdminApiClient.getTabs);

export const useGetLyrics = () => useQuery(['lyrics'], AdminApiClient.getLyrics);

export const useGetImages = () => useQuery(['images'], AdminApiClient.getImages);

export const useGetEvents = () => useQuery(['events'], AdminApiClient.getEvents);

let uploadRecordingToastId: Id;

export const useUploadRecording = () =>
  useMutation(AdminApiClient.postRecording, {
    onError: () => {
      toast.dismiss(uploadRecordingToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      uploadRecordingToastId = toast.success('Uploading recording...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(uploadRecordingToastId);
      toast.success('Finished uploading recording 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['recordings']);
    },
  });

let deleteRecordingToastId: Id;

export const useDeleteRecording = () =>
  useMutation(AdminApiClient.deleteRecording, {
    onError: () => {
      toast.dismiss(deleteRecordingToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      deleteRecordingToastId = toast.success('Deleting recording...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(deleteRecordingToastId);
      toast.success('Finished deleting recording 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['recordings']);
    },
  });

let uploadTabToastId: Id;

export const useUploadTab = () =>
  useMutation(AdminApiClient.postTab, {
    onError: () => {
      toast.dismiss(uploadTabToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      uploadTabToastId = toast.success('Uploading tabs...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(uploadTabToastId);
      toast.success('Finished uploading tabs 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['tabs']);
    },
  });

let uploadImageToastId: Id;

export const useUploadImage = () =>
  useMutation(AdminApiClient.postImage, {
    onError: () => {
      toast.dismiss(uploadImageToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      uploadImageToastId = toast.success('Uploading image...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(uploadImageToastId);
      toast.success('Finished uploading image 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['images']);
    },
  });

let uploadEventToastId: Id;

export const useUploadEvent = () =>
  useMutation(AdminApiClient.postEvent, {
    onError: () => {
      toast.dismiss(uploadEventToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      uploadEventToastId = toast.success('Uploading event...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(uploadEventToastId);
      toast.success('Finished uploading event 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['events']);
    },
  });

let deleteTabToastId: Id;

export const useDeleteTab = () =>
  useMutation(AdminApiClient.deleteTab, {
    onError: () => {
      toast.dismiss(deleteTabToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      deleteTabToastId = toast.success('Deleting tab...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(deleteTabToastId);
      toast.success('Finished deleting tab 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['tabs']);
    },
  });

let uploadLyricsToastId: Id;

export const useUploadLyrics = () =>
  useMutation(AdminApiClient.postLyrics, {
    onError: () => {
      toast.dismiss(uploadLyricsToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      uploadLyricsToastId = toast.success('Uploading lyrics...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(uploadLyricsToastId);
      toast.success('Finished uploading lyrics 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['lyrics']);
    },
  });

let deleteImageToastId: Id;

export const useDeleteImage = () =>
  useMutation(AdminApiClient.deleteImage, {
    onError: () => {
      toast.dismiss(deleteImageToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      deleteImageToastId = toast.success('Deleting image...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(deleteImageToastId);
      toast.success('Finished deleting image 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['images']);
    },
  });

let deleteEventToastId: Id;

export const useDeleteEvent = () =>
  useMutation(AdminApiClient.deleteEvent, {
    onError: () => {
      toast.dismiss(deleteEventToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      deleteEventToastId = toast.success('Deleting event...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(deleteEventToastId);
      toast.success('Finished deleting event 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['events']);
    },
  });

let deleteLyricsToastId: Id;

export const useDeleteLyrics = () =>
  useMutation(AdminApiClient.deleteLyrics, {
    onError: () => {
      toast.dismiss(deleteLyricsToastId);
      toast.error('Fuck something happened 🤯', { autoClose: 3000 });
    },
    onMutate: () => {
      deleteLyricsToastId = toast.success('Deleting lyrics...', { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.dismiss(deleteLyricsToastId);
      toast.success('Finished deleting lyrics 👌', { autoClose: 3000 });
      queryClient.invalidateQueries(['lyrics']);
    },
  });
