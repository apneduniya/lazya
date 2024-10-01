import { SunspotLoader } from "react-awesome-loaders";


export default function Loader({ loading = true }) {
    return (
        <>
            {
                loading && (
                    <div className="flex justify-center items-center h-[100dvh] w-[100%] fixed top-0 left-0 bg-gray-400 bg-opacity-50 z-[99999999] backdrop-filter backdrop-blur-lg">
                        <SunspotLoader
                            gradientColors={["#444444", "#E0E7FF"]}
                            shadowColor={"#3730A3"}
                            desktopSize={"80px"}
                            mobileSize={"48px"}
                        />
                    </div>
                )
            }
        </>
    );
};