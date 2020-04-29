import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

class UserPermissions {
    getCameraRollPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            alert('We need permission to use your camera roll');
        }
    }

    getCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        if (status !== 'granted') {
            alert('We need permission to use your camera');
        }
    }

    getPositionPermission = async () => {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            alert('We need permission to access your position');
        }
    }}

export default new UserPermissions();