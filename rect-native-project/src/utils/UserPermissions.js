import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

class UserPermissions {
    getCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            alert('We need permission to use your camera roll');
        }
    }

    getPositionPermission = async () => {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            alert('We need permission to access your position');
        }
    }}

export default new UserPermissions();