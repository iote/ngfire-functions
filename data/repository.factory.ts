import * as admin from 'firebase-admin';

import { IObject } from 'ngfire-shared';
import { AdminRepository } from './repositories/admin-repository.model';

let store: any;

function _createRepository<T extends IObject>(path: string)
{
  if (store == null)
    store = _getStore();

  return new AdminRepository<T>(path, store);
}

function _getStore() {
  const fireStore = admin.firestore();

  // Firestore Db Change -- With this change, timestamps stored in Cloud Firestore will be read back as Firebase Timestamp objects 
  // instead of as system Date objects.So you will also need to update code expecting a Date to instead expect a Timestamp.
  // For example:
  // - Old: const date = snapshot.get('created_at');
  // - New: const timestamp = snapshot.get('created_at'); const date = timestamp.toDate();
  fireStore.settings({ timestampsInSnapshots: true });

  return fireStore;
}

export const RepositoryFactory = {
  create: _createRepository
};
