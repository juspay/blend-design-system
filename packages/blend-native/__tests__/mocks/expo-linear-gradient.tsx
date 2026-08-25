import React from 'react'
import { View } from 'react-native'

/**
 * `expo-linear-gradient` is an optional peer, so the test toolchain does not
 * install Expo. `Pressable` only needs the component to exist and accept its
 * props — the gradient's visual output is verified on a simulator, not here.
 */
export const LinearGradient = (
    props: React.ComponentProps<typeof View> & { colors?: readonly string[] }
) => <View {...props} testID={props.testID ?? 'linear-gradient'} />

export default { LinearGradient }
