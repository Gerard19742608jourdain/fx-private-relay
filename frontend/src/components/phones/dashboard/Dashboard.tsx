/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useRelayNumber } from "../../../hooks/api/relayNumber";
import styles from "./PhoneDashboard.module.scss";
import { CopyIcon, ForwardIcon, BlockIcon } from "../../../components/Icons";
import { MouseEventHandler, useState } from "react";

export const PhoneDashboard = () => {
  const relayNumberData = useRelayNumber();
  const [justCopiedPhoneNumber, setJustCopiedPhoneNumber] = useState(false);

  const [enableForwarding, setEnableForwarding] = useState(
    relayNumberData.data?.[0].enabled
  );

  e164PhoneNumberFormat(relayNumberData.data?.[0].number!);

  const toggleForwarding = () => {
    setEnableForwarding(!enableForwarding);
    // TODO: Find a way to not have to use a non-null assertion operator here
    relayNumberData.setForwardingState(
      relayNumberData.data?.[0].number!,
      !enableForwarding,
      relayNumberData.data?.[0].id!
    );
  };

  const copyPhoneNumber: MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: Find a way to not have to use a non-null assertion operator here
    navigator.clipboard.writeText(relayNumberData?.data?.[0].number!);
    setJustCopiedPhoneNumber(true);
    setTimeout(() => setJustCopiedPhoneNumber(false), 1000);
  };

  const phoneStatistics = (
    <div className={styles["phone-statistics-container"]}>
      <div className={styles["phone-statistics"]}>
        <p className={styles["phone-statistics-title"]}>12:04 min</p>
        <p className={styles["phone-statistics-body"]}>
          Remaining call minutes
        </p>
      </div>

      <div className={styles["phone-statistics"]}>
        <p className={styles["phone-statistics-title"]}>36</p>
        <p className={styles["phone-statistics-body"]}>Remaining texts</p>
      </div>

      <div
        className={`${styles["phone-statistics"]} ${
          enableForwarding ? "" : styles["inactive-statistics"]
        }`}
      >
        <p className={styles["phone-statistics-title"]}>7</p>
        <p className={styles["phone-statistics-body"]}>
          Calls and texts forwarded
        </p>
      </div>

      <div
        className={`${styles["phone-statistics"]} ${
          enableForwarding ? styles["inactive-statistics"] : ""
        }`}
      >
        <p className={styles["phone-statistics-title"]}>0</p>
        <p className={styles["phone-statistics-body"]}>
          Calls and texts blocked
        </p>
      </div>
    </div>
  );

  const phoneControls = (
    <div className={styles["phone-controls-container"]}>
      <div className={styles["phone-controls"]}>
        <button
          onClick={toggleForwarding}
          className={`${styles["base-button"]} ${
            enableForwarding ? styles["active-button"] : ""
          }`}
        >
          <ForwardIcon
            alt="Forwarding All Messages"
            className={styles["forward-icon"]}
            width={15}
            height={15}
          />
        </button>
        <button
          onClick={toggleForwarding}
          className={`${styles["base-button"]} ${
            enableForwarding ? "" : styles["active-button"]
          }`}
        >
          <BlockIcon
            alt="Blocking All Messages"
            className={styles["block-icon"]}
            width={15}
            height={15}
          />
        </button>
      </div>
      <div className={styles["phone-controls-description"]}>
        {enableForwarding ? (
          <span>
            Relay is currently forwarding all phone calls and SMS messages to
            your true phone number.
          </span>
        ) : (
          <span>
            Relay is blocking all phone calls and text messages—you will not
            receive anything from your phone number mask.
          </span>
        )}
      </div>
    </div>
  );

  const phoneMetadata = (
    <div className={styles["metadata-container"]}>
      <dl>
        <div className={`${styles["forward-target"]} ${styles.metadata}`}>
          <dt>Forwarded to:</dt>
          <dd>Add user phone number here</dd>
        </div>
        <div className={`${styles["date-created"]} ${styles.metadata}`}>
          <dt>Date Created:</dt>
          <dd>Date</dd>
        </div>
      </dl>
    </div>
  );

  return (
    <main>
      <div className={styles["dashboard-card"]}>
        <span className={styles["header-phone-number"]}>
          {e164PhoneNumberFormat(relayNumberData.data?.[0].number!)}
          <span className={styles["copy-controls"]}>
            <span className={styles["copy-button-wrapper"]}>
              <button
                type="button"
                className={styles["copy-button"]}
                title="Copied"
                onClick={copyPhoneNumber}
              >
                <CopyIcon
                  alt="test"
                  className={styles["copy-icon"]}
                  width={32}
                  height={32}
                />
              </button>
              <span
                aria-hidden={!justCopiedPhoneNumber}
                className={`${styles["copied-confirmation"]} ${
                  justCopiedPhoneNumber ? styles["is-shown"] : ""
                }`}
              >
                Copied!
              </span>
            </span>
          </span>
        </span>

        {phoneStatistics}
        {phoneControls}
        {phoneMetadata}
      </div>
    </main>
  );
};

function e164PhoneNumberFormat(relayNumber: string) {
  const arrayPhoneNumber = relayNumber.split("");
  arrayPhoneNumber?.splice(2, 0, " (");
  arrayPhoneNumber?.splice(6, 0, ") ");
  const phoneNumberBracketed = arrayPhoneNumber?.join("");
  return phoneNumberBracketed;
}
