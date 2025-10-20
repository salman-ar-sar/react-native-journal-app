import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  BookImage,
  Camera,
  ImagePlus,
  LocateFixed,
} from 'lucide-react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { saveJournalEntry } from '../store/journalStorage';

const NewEntrySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  image: z.string().min(1),
});

type NewEntryForm = z.infer<typeof NewEntrySchema>;

export default function NewEntry() {
  const { goBack } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewEntrySchema),
  });
  const onSubmit = (data: NewEntryForm) => {
    saveJournalEntry(data.title, data.description, data.image);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <ArrowLeft size={24} />
        </Pressable>
        <Text style={styles.title}>New Journal Entry</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <>
                <View style={styles.imageContainer}>
                  {field.value ? (
                    <Image source={{ uri: field.value }} style={styles.image} />
                  ) : (
                    <ImagePlus color={styles.imageIcon.color} size={36} />
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={async () => {
                      const { assets } = await launchCamera({
                        mediaType: 'photo',
                      });

                      if (assets?.length) field.onChange(assets[0].uri);
                    }}
                    style={[styles.button, styles.primaryButton]}
                  >
                    <Camera color={styles.primaryButton.color} />
                    <Text style={[styles.text, styles.primaryButtonText]}>
                      Take Photo
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={async () => {
                      const { assets } = await launchImageLibrary({
                        mediaType: 'photo',
                      });

                      if (assets?.length) field.onChange(assets[0].uri);
                    }}
                    style={[
                      styles.button,
                      styles.secondaryButton,
                      styles.chooseLibraryButton,
                    ]}
                  >
                    <BookImage color={styles.secondaryButton.color} />
                    <Text style={[styles.text, styles.secondaryButtonText]}>
                      Choose from library
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          />

          <View style={styles.formContainer}>
            <View style={styles.formInputContainer}>
              <Text style={styles.text}>Title</Text>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter a title for your entry"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title.message}</Text>
              )}
            </View>
            <View style={styles.formInputContainer}>
              <Text style={styles.text}>Notes</Text>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextInput
                    style={[styles.textInput, styles.textInputMultiline]}
                    placeholder="Write about your experience"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    multiline
                  />
                )}
              />
            </View>
            {errors.description && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}
          </View>
          <Pressable
            onPress={() => {
              console.log('TODO');
            }}
            style={[
              styles.button,
              styles.secondaryButton,
              styles.useCurrentLocationButton,
            ]}
          >
            <LocateFixed color={styles.secondaryButton.color} />
            <Text style={[styles.text, styles.secondaryButtonText]}>
              Use Current Location
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
            style={[styles.button, styles.primaryButton, styles.submitButton]}
          >
            <Text style={[styles.text, styles.primaryButtonText]}>
              Save Entry
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
    paddingHorizontal: 16,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'center',
    marginRight: 24, // to align with the back arrow
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#E2E8EF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageIcon: {
    color: '#94A3B8',
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginVertical: 16,
  },
  button: {
    flex: 1,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#14A4EC',
    color: '#fff',
  },
  chooseLibraryButton: {
    flex: 1.5,
  },
  secondaryButton: {
    backgroundColor: '#E2E8EF',
    color: '#0E172A',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E172A',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#0E172A',
  },
  formContainer: {
    gap: 8,
  },
  formInputContainer: {
    gap: 4,
  },
  textInput: {
    fontSize: 16,
    height: 56,
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#E2E8EF',
  },
  textInputMultiline: {
    height: 140,
    textAlignVertical: 'top',
  },
  useCurrentLocationButton: {
    flex: 0,
    marginVertical: 16,
  },
  submitButton: {
    flex: 0,
    marginVertical: 16,
    height: 56,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 8,
  },
});
